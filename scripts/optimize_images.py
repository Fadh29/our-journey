import os
from PIL import Image, ImageOps

source_dir = r"c:\Gawe\gawe\planning\img"
target_dir = r"c:\Gawe\gawe\planning\public\images"
os.makedirs(target_dir, exist_ok=True)

# Image mapping for semantically clear names
name_mapping = {
    "1794136752120.jpg.jpeg": "hero-landing.webp",
    "1794240272940.jpg.jpeg": "about-raihan.webp",
    "awal tiktok.jpeg": "story-tiktok.webp",
    "awal wa.jpeg": "story-wa.webp",
    "awal ketemu.jpeg": "story-meet.webp",
    "awal nonton.jpeg": "story-movie.webp",
    "20261107_172852.jpg.jpeg": "memory-meet-1.webp",
    "20261107_172901.jpg.jpeg": "memory-meet-2.webp",
    "20261107_172940.jpg.jpeg": "memory-meet-3.webp",
    "20261109_144405.jpg.jpeg": "memory-movie-1.webp",
}

print(f"Processing images from {source_dir} to {target_dir}...")

for filename in os.listdir(source_dir):
    filepath = os.path.join(source_dir, filename)
    if not os.path.isfile(filepath):
        continue

    try:
        with Image.open(filepath) as img:
            # Correct orientation from EXIF
            img = ImageOps.exif_transpose(img)
            
            # Convert RGBA/P to RGB if necessary for webp/jpeg
            if img.mode in ("RGBA", "LA", "P"):
                rgb_img = Image.new("RGB", img.size, (255, 255, 255))
                if img.mode == "P":
                    img = img.convert("RGBA")
                rgb_img.paste(img, mask=img.split()[-1] if img.mode in ("RGBA", "LA") else None)
                img = rgb_img
            elif img.mode != "RGB":
                img = img.convert("RGB")

            # Max dimension: 1920px for web display
            max_dim = 1920
            w, h = img.size
            if max(w, h) > max_dim:
                scale = max_dim / max(w, h)
                new_w = int(w * scale)
                new_h = int(h * scale)
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
            # Save mapped name
            mapped_name = name_mapping.get(filename)
            if mapped_name:
                out_path = os.path.join(target_dir, mapped_name)
                img.save(out_path, "WEBP", quality=85, method=6)
                print(f"Saved {mapped_name} ({img.size[0]}x{img.size[1]})")

            # Also save sanitized original filename as webp
            clean_name = filename.replace(" ", "_").replace(".jpg.jpeg", ".webp").replace(".jpeg", ".webp")
            if not clean_name.endswith(".webp"):
                clean_name += ".webp"
            out_path_clean = os.path.join(target_dir, clean_name)
            img.save(out_path_clean, "WEBP", quality=85, method=6)
            print(f"Saved {clean_name} ({img.size[0]}x{img.size[1]})")

    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("Image processing complete!")
