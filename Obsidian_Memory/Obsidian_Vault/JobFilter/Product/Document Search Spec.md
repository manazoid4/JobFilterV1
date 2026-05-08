# Document Search Spec

Created: 8 May 2026
Status: Spec complete — prototype built
Owner: Product / Build
Related: [[Research Briefs - 8th May 2026#BRIEF 2: Document Search Feature Specification]]

---

## PROBLEM

Buildscout's most defensible feature is document text search. Trades can search planning documents for keywords like "timber frame", "velux windows", "two storey extension". This lets them hyper-target jobs matching their exact capability.

JobFilter needs this to compete. Without it, we're a postcode scanner — not a precision tool.

---

## USER FLOW

1. Trade goes to Find Jobs page
2. Sees "Search planning docs by keyword" section
3. Types keyword (e.g. "extension") or taps popular keyword button
4. Results show matching planning documents with highlighted keyword matches
5. Each result shows: title, location, council, document type, matched keywords, snippet, detected trades
6. Trade can track the lead or view full document
7. Free users get 3 searches. Pro gets unlimited.
8. Future: WhatsApp alert when new doc matches saved keyword

---

## TECHNICAL ARCHITECTURE

### Phase 1: Mock (DONE)
- Frontend component built
- Mock data with realistic planning document entries
- Keyword matching logic
- Auto-tagging by detected keywords
- Brutalist yellow design, mobile-friendly

### Phase 2: PDF Extraction Pipeline

#### Option A: AWS Textract
- Cost: $1.50 per 1,000 pages ($0.0015/page)
- Pros: High accuracy, handles scanned PDFs, tables, handwriting
- Cons: Cost adds up at scale, vendor lock-in
- Birmingham planning docs: ~500 new apps/week × avg 5 pages = 2,500 pages/week = $3.75/week

#### Option B: Open-source (PDF.js + Tesseract OCR)
- Cost: $0 (compute only)
- Pros: Free, no vendor lock-in, unlimited scale
- Cons: Lower accuracy on scanned docs, need to manage OCR pipeline
- Setup: PDF.js extracts text from text-based PDFs. Tesseract handles image-based PDFs.
- Compute: ~£5-10/mo on a small EC2 or Lambda

#### Option C: Hybrid (recommended)
- Use PDF.js for text-based PDFs (80% of docs) — free
- Fall back to Textract only for scanned/image PDFs (20% of docs) — $0.75/week
- Best of both worlds

#### Option D: Unstructured.io / Marker
- Open-source document parsing
- Better than raw Tesseract for complex layouts
- Self-hostable on EC2
- Worth evaluating before build

### Phase 3: Storage Strategy

```
planning-docs/
  {council}/
    {planning-ref}/
      metadata.json        # title, location, date, source URL
      extracted-text.txt   # full text from PDF
      keywords.json        # auto-detected keywords + confidence
      raw.pdf              # original document (optional)
```

- Store extracted text in Supabase (PostgreSQL) with full-text search index
- Use `tsvector` for fast keyword matching
- Store metadata + keywords as JSONB columns
- Index on: council, date, keywords array, trade tags

### Phase 4: Search Index Design

```sql
CREATE TABLE planning_documents (
  id uuid PRIMARY KEY,
  planning_ref text UNIQUE,
  title text NOT NULL,
  council text NOT NULL,
  location text,
  postcode_outward text,
  doc_type text,
  source_url text,
  published_at timestamptz,
  extracted_text text,
  text_search tsvector GENERATED ALWAYS AS (to_tsvector('english', extracted_text)) STORED,
  keywords text[],
  trade_tags text[],
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_planning_text_search ON planning_documents USING GIN(text_search);
CREATE INDEX idx_planning_keywords ON planning_documents USING GIN(keywords);
CREATE INDEX idx_planning_trade_tags ON planning_documents USING GIN(trade_tags);
CREATE INDEX idx_planning_council ON planning_documents(council);
```

Query:
```sql
SELECT id, title, location, council, doc_type, keywords, trade_tags,
       ts_rank(text_search, query) AS relevance
FROM planning_documents,
     plainto_tsquery('english', 'extension') query
WHERE text_search @@ query
ORDER BY relevance DESC
LIMIT 50;
```

---

## COST ANALYSIS

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| PDF extraction (hybrid) | £3-5/mo | Textract for scanned docs only |
| Supabase storage | £0 (free tier) | 500GB included |
| Compute (extraction worker) | £5-10/mo | Lambda or small EC2 |
| Search (PostgreSQL FTS) | £0 | Built into Supabase |
| **Total** | **£8-15/mo** | Scales with document volume |

At 10,000 documents/month:
- Extraction: ~£5 (mostly PDF.js, small Textract fallback)
- Storage: ~50MB text — negligible
- Search: instant via tsvector index

Compare to Buildscout: they charge £239/mo for this. We can run it for £15/mo.

---

## KEYWORD TAXONOMY

### Top 20 keywords trades search for:
1. extension
2. loft conversion
3. heat pump
4. solar panels
5. EV charger
6. kitchen
7. bathroom
8. timber frame
9. velux windows
10. two storey
11. garage conversion
12. rewire
13. new build
14. flat roof
15. drainage
16. conservatory
17. bi-fold doors
18. underfloor heating
19. cladding
20. listed building

### Auto-tagging rules:
- "extension" → building, extension
- "loft" → building, loft, carpentry, roofing
- "heat pump" → hvac, plumbing, heat pump
- "solar" → electrical, roofing, solar
- "rewire" → electrical, rewire
- "bathroom" → plumbing, bathroom, building
- "velux" → roofing, carpentry, velux

---

## FEATURE GATING

| Tier | Access |
|------|--------|
| Free | 3 searches/week, results shown but full document locked |
| Pro (£29/mo) | Unlimited searches, full document access |
| Pro+ (£49/mo) | Everything + WhatsApp alerts for keyword matches, auto-tagged leads |

### WhatsApp alert flow (Pro+):
1. User saves keyword: "extension"
2. New planning doc published with "extension" in text
3. WhatsApp fires within 5 minutes: "NEW: Two storey extension in Solihull B91. Planning ref P2026/0847. Tap to view."
4. One-tap link opens full document in app

---

## DATA SOURCES FOR PLANNING DOCS

### UK Planning Portals:
- **Planning Portal** (planningportal.co.uk) — central hub
- **Individual council websites** — each has their own planning search
- **ePlanning.scot** — Scotland
- **eplanningni.gov.uk** — Northern Ireland
- **planningonline.wales** — Wales

### Scraping approach:
1. Identify top 50 councils by planning application volume
2. Build council-specific scrapers (each portal is different)
3. Download PDFs from planning application pages
4. Run through extraction pipeline
5. Store in Supabase with metadata

### Alternative: Partner with planning data aggregator
- **PlanX** — planning data API
- **LandInsight** — development data
- **Gladstone** — planning intelligence
- May be cheaper than building scrapers

---

## IMPLEMENTATION PLAN

### Week 1-2: Pipeline
- [ ] Build PDF download scraper for 5 pilot councils (Birmingham, Solihull, Walsall, Sandwell, Dudley)
- [ ] Set up PDF.js + Textract hybrid extraction
- [ ] Store results in Supabase
- [ ] Test accuracy on 100 documents

### Week 3-4: Search
- [ ] Implement PostgreSQL full-text search
- [ ] Build keyword auto-tagging
- [ ] Create search API endpoint
- [ ] Connect frontend component to real API

### Week 5-6: Alerts
- [ ] Keyword watchlist feature
- [ ] WhatsApp alert integration for new matches
- [ ] Pro+ tier gating

### Week 7-8: Scale
- [ ] Expand to 50 councils
- [ ] Optimize extraction costs
- [ ] Add search filters (council, date range, doc type)

---

## RISKS

1. **Council portals change structure** — scrapers break. Need monitoring + auto-recovery.
2. **PDF quality varies** — scanned docs with poor OCR. Textract handles this but costs more.
3. **Legal** — planning documents are public record. No legal issue with accessing and indexing them.
4. **Scale** — 400+ UK councils. Start with top 50 by volume (covers 80% of applications).

---

## COMPETITIVE POSITIONING

Buildscout: £239/mo, document search included
JobFilter: £29/mo basic, document search at £49/mo Pro+

We're 5x cheaper for the same capability. That's the pitch.
