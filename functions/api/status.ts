interface Env { DB: D1Database }
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const record = await env.DB.prepare("SELECT count(*) AS total FROM lessons").first<{total:number}>();
    return Response.json({connected:true,storedLessons:record?.total??0,progressStorage:"browser-local",database:"Cloudflare D1"});
  } catch {
    return Response.json({connected:false,error:"Database not available"},{status:503});
  }
};