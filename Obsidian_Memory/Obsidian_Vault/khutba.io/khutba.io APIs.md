# khutba.io APIs

## Links
- [[khutba.io Project Outline]]
- [[khutba.io Overview]]
- [[khutba.io Map]]

## Speech-to-Text
**Recommended: Deepgram** — lowest latency (<300ms), streaming, Arabic support (~$0.0043/min)

| Option | Notes | Cost/min |
|---|---|---|
| Deepgram ✅ | Best latency, streaming | $0.0043 |
| OpenAI Whisper | Best accuracy, REST only | $0.006 |
| AssemblyAI | Good multilingual | $0.0062 |
| Google STT | Broad language support | $0.016 |

## Translation
**Recommended: Google Translate API** — best Arabic + Urdu + Somali + Bengali coverage (~$20/1M chars)

| Option | Notes |
|---|---|
| Google Translate ✅ | Best language coverage |
| DeepL | Best quality EN/DE/FR, weak Arabic |
| LibreTranslate | Free, self-hosted, lower quality |

## Required API Keys
```
DEEPGRAM_API_KEY=
GOOGLE_TRANSLATE_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Monthly Cost Per Masjid
~$3.26/mo at 2 khutbas/week. Margin at £29 starter = strong.
