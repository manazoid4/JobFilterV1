import { PrismaClient, SourcePlatform, FlipStage } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { clerkId: "user_demo_123" },
    create: { clerkId: "user_demo_123", email: "demo@flipsignal.ai", name: "Demo User", planTier: "PRO" },
    update: {},
  });

  const fbSource = await prisma.scraperSource.upsert({
    where: { id: "seed-fb-electronics" },
    create: {
      id: "seed-fb-electronics",
      platform: SourcePlatform.FACEBOOK_MARKETPLACE,
      region: "London",
      searchQuery: "iphone",
      category: "Electronics",
    },
    update: {},
  });

  await prisma.scraperSource.upsert({
    where: { id: "seed-gumtree-electronics" },
    create: {
      id: "seed-gumtree-electronics",
      platform: SourcePlatform.GUMTREE,
      region: "Manchester",
      searchQuery: "macbook",
      category: "Electronics",
    },
    update: {},
  });

  // --- Listing 1: iPhone 12, cracked screen, strong arbitrage gap ---
  const listing1 = await prisma.listing.upsert({
    where: { platform_externalId: { platform: SourcePlatform.FACEBOOK_MARKETPLACE, externalId: "seed-iphone12" } },
    create: {
      sourceId: fbSource.id,
      platform: SourcePlatform.FACEBOOK_MARKETPLACE,
      externalId: "seed-iphone12",
      url: "https://www.facebook.com/marketplace/item/seed-iphone12",
      title: "iPhone 12 64GB - cracked screen, works fine",
      description: "Selling my iPhone 12 64GB. Screen is cracked but fully functional, battery health 87%. Quick sale needed, moving abroad next week.",
      priceCents: 6000,
      currency: "GBP",
      location: "London",
      imageUrls: [],
      status: "ANALYZED",
      postedAt: new Date(),
      rawPayload: {},
    },
    update: {},
  });

  await prisma.listingAnalysis.upsert({
    where: { listingId: listing1.id },
    create: {
      listingId: listing1.id,
      category: "Electronics",
      subcategory: "Phones",
      brand: "Apple",
      model: "iPhone 12",
      conditionScore: 65,
      urgencyScore: 78,
      sellerIntentScore: 72,
      undervaluationProb: 0.7,
      riskScore: 20,
      identifiedAttributes: { riskLevel: "LOW", riskFlags: ["damaged"] },
      aiModel: "seed",
      promptVersion: "v1",
      rawResponse: {},
    },
    update: {},
  });

  await prisma.profitEstimate.upsert({
    where: { listingId: listing1.id },
    create: {
      listingId: listing1.id,
      expectedResaleCents: 15000,
      worstCaseCents: 11000,
      bestCaseCents: 19000,
      platformFeeCents: 1920,
      transportCostCents: 450,
      refurbCostCents: 4000, // screen replacement
      timeToSellDays: 7,
      liquidityScore: 85,
      roiPercent: 53.8,
      profitDistribution: { p10: 530, p25: 1500, p50: 2630, p75: 3760, p90: 4900 },
    },
    update: {},
  });

  await prisma.dealScore.upsert({
    where: { listingId: listing1.id },
    create: {
      listingId: listing1.id,
      score: 78,
      arbitrageGap: 1.5,
      demandStrength: 80,
      resaleVelocity: 79,
      competitionDensity: 50,
      listingQuality: 60,
      sellerUrgencySignal: 90,
      categoryPerformance: 54,
      breakdown: { note: "seed data" },
      modelVersion: "dealscore-v1",
    },
    update: {},
  });

  const flip1 = await prisma.flipOpportunity.upsert({
    where: { listingId: listing1.id },
    create: { listingId: listing1.id, rank: 1, reasonTags: ["underpriced_cluster", "hidden_value"] },
    update: {},
  });

  // --- Listing 2: MacBook Air, good condition, moderate gap ---
  const listing2 = await prisma.listing.upsert({
    where: { platform_externalId: { platform: SourcePlatform.GUMTREE, externalId: "seed-macbook-air" } },
    create: {
      platform: SourcePlatform.GUMTREE,
      externalId: "seed-macbook-air",
      url: "https://www.gumtree.com/p/seed-macbook-air",
      title: "MacBook Air M1 2020 - excellent condition",
      description: "Barely used MacBook Air M1, 256GB. Comes with original box and charger. Selling due to upgrade.",
      priceCents: 35000,
      currency: "GBP",
      location: "Manchester",
      imageUrls: [],
      status: "ANALYZED",
      postedAt: new Date(),
      rawPayload: {},
    },
    update: {},
  });

  await prisma.listingAnalysis.upsert({
    where: { listingId: listing2.id },
    create: {
      listingId: listing2.id,
      category: "Electronics",
      subcategory: "Laptops",
      brand: "Apple",
      model: "MacBook Air M1",
      conditionScore: 90,
      urgencyScore: 40,
      sellerIntentScore: 55,
      undervaluationProb: 0.3,
      riskScore: 10,
      identifiedAttributes: { riskLevel: "LOW", riskFlags: [] },
      aiModel: "seed",
      promptVersion: "v1",
      rawResponse: {},
    },
    update: {},
  });

  await prisma.profitEstimate.upsert({
    where: { listingId: listing2.id },
    create: {
      listingId: listing2.id,
      expectedResaleCents: 45000,
      worstCaseCents: 40000,
      bestCaseCents: 50000,
      platformFeeCents: 5760,
      transportCostCents: 450,
      refurbCostCents: 0,
      timeToSellDays: 10,
      liquidityScore: 75,
      roiPercent: 9.7,
      profitDistribution: { p10: 1090, p25: 2300, p50: 3450, p75: 4600, p90: 5740 },
    },
    update: {},
  });

  await prisma.dealScore.upsert({
    where: { listingId: listing2.id },
    create: {
      listingId: listing2.id,
      score: 62,
      arbitrageGap: 0.29,
      demandStrength: 70,
      resaleVelocity: 70,
      competitionDensity: 50,
      listingQuality: 80,
      sellerUrgencySignal: 17,
      categoryPerformance: 54,
      breakdown: { note: "seed data" },
      modelVersion: "dealscore-v1",
    },
    update: {},
  });

  await prisma.flipOpportunity.upsert({
    where: { listingId: listing2.id },
    create: { listingId: listing2.id, rank: 2, reasonTags: ["underpriced_cluster"] },
    update: {},
  });

  // --- Listing 3: vintage sofa, low score (not surfaced as opportunity) ---
  const listing3 = await prisma.listing.upsert({
    where: { platform_externalId: { platform: SourcePlatform.FACEBOOK_MARKETPLACE, externalId: "seed-sofa" } },
    create: {
      platform: SourcePlatform.FACEBOOK_MARKETPLACE,
      externalId: "seed-sofa",
      url: "https://www.facebook.com/marketplace/item/seed-sofa",
      title: "3-seater sofa - used",
      description: "Used sofa, some wear and tear. Collection only.",
      priceCents: 8000,
      currency: "GBP",
      location: "Birmingham",
      imageUrls: [],
      status: "ANALYZED",
      postedAt: new Date(),
      rawPayload: {},
    },
    update: {},
  });

  await prisma.listingAnalysis.upsert({
    where: { listingId: listing3.id },
    create: {
      listingId: listing3.id,
      category: "Furniture",
      conditionScore: 50,
      urgencyScore: 30,
      sellerIntentScore: 35,
      undervaluationProb: 0.1,
      riskScore: 15,
      identifiedAttributes: { riskLevel: "LOW", riskFlags: [] },
      aiModel: "seed",
      promptVersion: "v1",
      rawResponse: {},
    },
    update: {},
  });

  await prisma.profitEstimate.upsert({
    where: { listingId: listing3.id },
    create: {
      listingId: listing3.id,
      expectedResaleCents: 9000,
      worstCaseCents: 6000,
      bestCaseCents: 12000,
      platformFeeCents: 1152,
      transportCostCents: 2000, // bulky item
      refurbCostCents: 0,
      timeToSellDays: 21,
      liquidityScore: 35,
      roiPercent: -15.6,
      profitDistribution: { p10: -3150, p25: -2150, p50: -1150, p75: -150, p90: 850 },
    },
    update: {},
  });

  await prisma.dealScore.upsert({
    where: { listingId: listing3.id },
    create: {
      listingId: listing3.id,
      score: 28,
      arbitrageGap: 0.125,
      demandStrength: 40,
      resaleVelocity: 37,
      competitionDensity: 50,
      listingQuality: 30,
      sellerUrgencySignal: 7,
      categoryPerformance: 30,
      breakdown: { note: "seed data" },
      modelVersion: "dealscore-v1",
    },
    update: {},
  });

  // --- Portfolio item for listing 1 ---
  const portfolioItem = await prisma.portfolioItem.upsert({
    where: { listingId: listing1.id },
    create: {
      userId: user.id,
      listingId: listing1.id,
      flipOpportunityId: flip1.id,
      stage: FlipStage.PURCHASED,
      purchasePriceCents: 5800,
      notes: "Negotiated down from 6000. Screen replacement booked.",
    },
    update: {},
  });

  await prisma.flipLifecycle.createMany({
    data: [
      { portfolioItemId: portfolioItem.id, flipOpportunityId: flip1.id, stage: FlipStage.DISCOVERED },
      { portfolioItemId: portfolioItem.id, flipOpportunityId: flip1.id, stage: FlipStage.VIEWED },
      { portfolioItemId: portfolioItem.id, flipOpportunityId: flip1.id, stage: FlipStage.CONTACTED },
      { portfolioItemId: portfolioItem.id, flipOpportunityId: flip1.id, stage: FlipStage.PURCHASED },
    ],
    skipDuplicates: true,
  });

  // --- Daily report ---
  const reportDate = new Date();
  reportDate.setUTCHours(0, 0, 0, 0);

  const existingReport = await prisma.dailyReport.findFirst({ where: { userId: null, reportDate } });
  if (!existingReport) {
    await prisma.dailyReport.create({
      data: {
        userId: null,
        reportDate,
        topFlips: [{ listingId: listing1.id, score: 78 }, { listingId: listing2.id, score: 62 }],
        emergingCategories: [{ category: "Electronics", avgRoiPercent: 25.4 }],
        priceAnomalies: [],
        localHotspots: [{ region: "London", category: "Electronics" }],
        riskWarnings: [],
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
