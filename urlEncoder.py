import urllib.parse

# === CONFIG ===
input_file = "5movieurl.m3u8"        # Original m3u8 file with full .ts URLs
output_file = "5movieurl_proxy.m3u8" # New file with encoded proxy URLs
proxy_url = "https://dm.porus-in2012.workers.dev"  # <- replace this

def rewrite_m3u8_with_proxy(input_path, output_path, proxy_base):
    with open(input_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    rewritten_lines = []
    for line in lines:
        if line.strip().startswith("http") and ".ts" in line:
            encoded = urllib.parse.quote(line.strip(), safe="")
            new_url = f"{proxy_base}/?url={encoded}"
            rewritten_lines.append(new_url + "\n")
        else:
            rewritten_lines.append(line)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.writelines(rewritten_lines)

    print(f"✅ Encoded m3u8 saved to: {output_path}")

if __name__ == "__main__":
    rewrite_m3u8_with_proxy(input_file, output_file, proxy_url)
