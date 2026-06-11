---
title: Manual Mirror 1:1 and Autosync Repository
sidebar_position: 2
---

# Manual Mirror 1:1 and Autosync Repository

Panduan ini membahas cara membuat salinan repository yang benar-benar **1:1** dari upstream, termasuk branch, tag, dan refs lain, lalu bagaimana mengaktifkan **autosync** menggunakan Forgejo atau Gitea.

Cocok dipakai ketika kamu ingin:

- menyimpan mirror privat dari repo publik,
- memastikan target identik dengan source,
- melakukan sync manual kapan saja,
- atau membiarkan Forgejo/Gitea melakukan sync otomatis.

## Kapan pakai mirror?

Kalau tujuanmu adalah menyalin repository secara penuh, gunakan **mirror**.

Perbedaannya:

- `git clone` biasa: untuk kerja harian dengan working tree
- `git clone --bare`: untuk copy repository tanpa working tree
- `git clone --mirror`: untuk copy repository beserta seluruh refs agar hasilnya semirip mungkin dengan upstream

Kalau yang dicari adalah **copy 1:1**, pilih `--mirror`.

---

## Opsi 1 — Manual mirror 1:1

### Step 1: Buat repository kosong di target

Buat repository kosong di platform tujuan, misalnya Forgejo, Gitea, atau GitHub.

Contoh target:

- `https://git.example.com/your-org/private-repo.git`

### Step 2: Clone seluruh refs dari source

```bash
git clone --mirror https://github.com/original-owner/public-repo.git
cd public-repo.git
```

### Step 3: Push seluruh refs ke target

```bash
git push --mirror https://git.example.com/your-org/private-repo.git
```

Perintah ini akan mendorong seluruh branch, tag, dan refs lain dari source ke target.

### Step 4: Hapus direktori temporary

```bash
cd ..
rm -rf public-repo.git
```

---

## Opsi 2 — Sync manual mirror yang sudah ada

Kalau mirror sudah pernah dibuat dan kamu hanya ingin update lagi dari upstream:

### Step 1: Clone mirror dari source

```bash
git clone --mirror https://github.com/original-owner/public-repo.git
cd public-repo.git
```

### Step 2: Set push URL ke target private

```bash
git remote set-url --push origin https://git.example.com/your-org/private-repo.git
```

### Step 3: Push seluruh refs

```bash
git push --mirror
```

### Step 4: Bersihkan direktori temporary

```bash
cd ..
rm -rf public-repo.git
```

---

## Verifikasi branch dan tag

Untuk memastikan hasil mirror benar-benar 1:1, bandingkan output source dan target.

### Cek branch

```bash
git ls-remote --heads https://github.com/original-owner/public-repo.git
git ls-remote --heads https://git.example.com/your-org/private-repo.git
```

### Cek tag

```bash
git ls-remote --tags https://github.com/original-owner/public-repo.git
git ls-remote --tags https://git.example.com/your-org/private-repo.git
```

Kalau hasilnya sama, berarti branch dan tag sudah sinkron.

---

## Autosync menggunakan Forgejo / Gitea mirror

Kalau kamu memakai Forgejo atau Gitea, repository bisa dibuat dalam mode **mirror** sehingga sinkronisasi dilakukan otomatis oleh server.

### Opsi A: Buat lewat UI

1. Login ke Forgejo/Gitea
2. Pilih **New Migration** atau **Migrate Repository**
3. Masukkan URL source repository, misalnya:
   - `https://github.com/original-owner/public-repo.git`
4. Pilih owner atau organization tujuan
5. Isi nama repository target
6. Aktifkan opsi **This repository will be a mirror**
7. Jalankan migrasi

Setelah selesai, repo akan menjadi mirror dan server akan melakukan sync berkala.

### Opsi B: Buat lewat API

```bash
curl -u 'USERNAME:PASSWORD' \
  -H 'Content-Type: application/json' \
  -X POST https://git.example.com/api/v1/repos/migrate \
  -d '{
    "clone_addr": "https://github.com/original-owner/public-repo.git",
    "repo_name": "private-repo",
    "repo_owner": "your-org",
    "service": "git",
    "mirror": true,
    "private": true
  }'
```

### Cek status mirror lewat API

```bash
curl -u 'USERNAME:PASSWORD' \
  https://git.example.com/api/v1/repos/your-org/private-repo
```

Perhatikan field berikut:

- `mirror`
- `mirror_interval`
- `mirror_updated`

Contoh:

```json
{
  "mirror": true,
  "mirror_interval": "8h0m0s",
  "mirror_updated": "2026-03-13T11:04:17Z"
}
```

Artinya repository tersebut adalah mirror dan disinkronkan otomatis tiap interval yang ditentukan server.

---

## Workflow yang disarankan

Kalau repo target dibuat sebagai **mirror murni**, jangan jadikan itu repo utama untuk coding harian.

Struktur yang lebih rapi biasanya:

- **Repo mirror**: salinan 1:1 dari upstream
- **Repo kerja privat**: tempat commit internal
- **Repo fork publik**: dipakai saat ingin kirim pull request ke upstream

Dengan pola ini, mirror tetap bersih dan repo kerja tetap fleksibel.

---

## Troubleshooting

### Branch di target terlihat lebih sedikit

Kemungkinan penyebabnya:

1. proses copy tidak menggunakan mode mirror,
2. atau upstream memang hanya punya sedikit branch.

Cek dengan:

```bash
git ls-remote --heads <source>
git ls-remote --heads <target>
```

Kalau hasilnya sama, berarti target sudah benar.

### Tag tidak ikut pindah

Pastikan kamu menggunakan:

```bash
git push --mirror
```

bukan hanya:

```bash
git push origin main
```

Karena push biasa hanya mendorong branch tertentu.

### Mirror target sudah terlanjur tidak sinkron

Cara paling bersih biasanya:

1. hapus repository target,
2. buat ulang sebagai mirror,
3. verifikasi branch dan tag setelah migrasi selesai.

---

## Reference

- [Duplicating a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository)
- [Forgejo documentation](https://forgejo.org/docs/latest/user/repo-migration/)
- [Gitea API: repository migration](https://docs.gitea.com/api/1.21/#tag/repository/operation/repoMigrate)
