import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { newsArticles, users } from '../lib/db/schema'
import { eq } from 'drizzle-orm'
import * as dotenv from 'dotenv'

dotenv.config()

async function updateNews() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

  const db = drizzle(pool)

  try {
    // Find existing article
    const [article] = await db.select().from(newsArticles).where(eq(newsArticles.slug, 'nomadic-pci-2025'))
    
    const contentEn = `
<p>English: The TAP (T and small Protrusion) technique is a simplified two-stent strategy used in bifurcation stenting, particularly as a bailout after provisional stenting when the side branch (SB) requires stenting.*</p>
<p>Here’s a detailed breakdown of the TAP technique and how it compares to other bifurcation strategies:</p>
<hr />
<p>🫀 What Is the TAP Technique?</p>
<p>TAP stands for T and small Protrusion. It is a modification of the classical T-stenting technique, designed to ensure complete coverage of the SB ostium while minimizing metal overlap and facilitating final kissing balloon inflation.</p>
<p>It is most often used when:</p>
<ul>
  <li>The provisional stenting strategy was attempted, but the SB has significant residual stenosis or dissection.</li>
  <li>A simple bailout is needed without the complexity of DK Crush or Culotte techniques.</li>
</ul>
<hr />
<p>🔧 Step-by-Step TAP Technique</p>
<p>Main Vessel (MV) Stenting:</p>
<ul>
  <li>A stent is deployed in the MV across the SB, jailing the SB.</li>
  <li>Rewire the Side Branch (SB): The SB is rewired through the MV stent struts.</li>
  <li>SB Stent Placement: A stent is positioned in the SB with minimal protrusion (1–2 mm) into the MV.</li>
  <li>SB Stent Deployment: The SB stent is deployed, ensuring ostial coverage.</li>
  <li>Final Kissing Balloon Inflation: Simultaneous balloon inflation in both MV and SB to optimize stent apposition and create a smooth neocarina.</li>
</ul>
<hr />
<p>✅ Advantages of TAP</p>
<ul>
  <li>Simple and fast: Easier to perform than DK Crush or Culotte.</li>
  <li>Compatible with 6 Fr guiding catheters.</li>
  <li>Ensures full SB ostial coverage with minimal metal overlap.</li>
  <li>Facilitates final kissing balloon inflation, improving long-term outcomes.</li>
</ul>
<hr />
<p>⚠️ Limitations</p>
<ul>
  <li>Neocarina formation: A small protruding strut may form at the carina, which could affect flow dynamics.</li>
  <li>Less ideal for complex bifurcations with large SB disease—DK Crush may be superior in such cases.</li>
  <li>Operator-dependent: Precise positioning of the SB stent is critical to avoid excessive protrusion or incomplete coverage.</li>
</ul>
<hr />
<p>🔍 When to Use TAP</p>
<ul>
  <li>As a bailout after failed provisional stenting.</li>
  <li>In non-left main bifurcations with moderate SB disease.</li>
  <li>When simplicity and speed are priorities.</li>
</ul>
<p><video src="/videos/facebook2.mp4" controls style="width: 100%; border-radius: 8px;"></video></p>
`

    if (article) {
      await db.update(newsArticles)
        .set({ contentEn, excerptEn: "The TAP (T and small Protrusion) technique is a simplified two-stent strategy used in bifurcation stenting." })
        .where(eq(newsArticles.id, article.id))
      console.log('✅ Nomadic PCI 2025 News article updated successfully!')
    } else {
      console.error('❌ Article not found to update.')
    }
  } catch (error) {
    console.error('❌ Error updating news article:', error)
  } finally {
    await pool.end()
  }
}

updateNews()
