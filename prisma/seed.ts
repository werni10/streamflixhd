import "dotenv/config";
import { db } from "../lib/db";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  await db.content.deleteMany({});
  await db.admin.deleteMany({});

  const hashedPassword = await bcrypt.hash("admin123", 10);
  await db.admin.create({
    data: { username: "admin", password: hashedPassword },
  });
  console.log("✅ Created default admin (username: admin, password: admin123)");

  const content = await db.content.createMany({
    data: [
      {
        type: "movie",
        title: "Inception",
        description:
          "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
        actors: "Leonardo DiCaprio, Ellen Page, Joseph Gordon-Levitt",
        photo: "https://images.unsplash.com/photo-1533928298208-27ff66555d92?w=300&h=450&fit=crop",
        link: "https://example.com/inception",
        isTop: 1,
      },
      {
        type: "movie",
        title: "The Matrix",
        description:
          "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        photo: "https://images.unsplash.com/photo-1517604931442-7e0c6ed2963c?w=300&h=450&fit=crop",
        link: "https://example.com/matrix",
        isTop: 1,
      },
      {
        type: "movie",
        title: "Interstellar",
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        photo: "https://images.unsplash.com/photo-1502890148763-39d75a1e7c28?w=300&h=450&fit=crop",
        link: "https://example.com/interstellar",
        isTop: 1,
      },
      {
        type: "movie",
        title: "The Dark Knight",
        description:
          "When the menace known as The Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.",
        actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
        photo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
        link: "https://example.com/dark-knight",
        isTop: 0,
      },
      {
        type: "series",
        title: "Breaking Bad",
        description:
          "A high school chemistry teacher turned meth cook partners with a former student to produce crystal meth.",
        actors: "Bryan Cranston, Aaron Paul, Anna Gunn",
        photo: "https://images.unsplash.com/photo-1517604931442-7e0c6ed2963c?w=300&h=450&fit=crop",
        link: "https://example.com/breaking-bad",
        isTop: 1,
      },
      {
        type: "series",
        title: "Stranger Things",
        description:
          "When a young boy disappears, his friends and family embark on a mysterious adventure into alternate dimensions.",
        actors: "Winona Ryder, David Harbour, Finn Wolfhard",
        photo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=450&fit=crop",
        link: "https://example.com/stranger-things",
        isTop: 1,
      },
    ],
  });

  console.log(`✅ Created ${content.count} content items`);
  console.log("Seeding complete!");
}

seed().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});
