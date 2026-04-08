import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createListing, getAllListings } from "@/lib/listing-store";

export async function GET() {
  const listings = await getAllListings();
  return NextResponse.json(listings);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const formData = await request.formData();
  const brand = formData.get("brand");
  const model = formData.get("model");
  const condition = formData.get("condition");
  const priceValue = formData.get("price");
  const description = formData.get("description");
  const photo = formData.get("phonePhoto");

  if (!brand || !model || !condition || !priceValue || !description || !photo) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const price = Number(priceValue);
  if (Number.isNaN(price) || price <= 0) {
    return NextResponse.json({ error: "Price must be a valid positive number." }, { status: 400 });
  }

  const file = photo as File;
  if (!file || typeof file.arrayBuffer !== "function" || !file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Phone photo must be an image file." }, { status: 400 });
  }

  const rawName = file.name?.replace(/[^a-zA-Z0-9.-]/g, "-") ?? "phone-image";
  const ext = path.extname(rawName) || ".jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const imageBuffer = Buffer.from(await file.arrayBuffer());
  const imagePath = path.join(uploadDir, fileName);
  await fs.writeFile(imagePath, imageBuffer);
  const imageUrl = `/uploads/${fileName}`;

  const sellerName = session.user.name ?? session.user.email;
  const sellerId = ((session.user as { id?: string }).id ?? session.user.email) as string;

  const listing = await createListing({
    brand: String(brand).trim(),
    model: String(model).trim(),
    condition: String(condition).trim(),
    price,
    description: String(description).trim(),
    imageUrl,
    sellerId: String(sellerId),
    sellerName: String(sellerName),
    sellerEmail: String(session.user.email),
  });

  return NextResponse.json({ listing }, { status: 201 });
}
