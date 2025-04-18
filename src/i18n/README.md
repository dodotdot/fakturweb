# Petunjuk Penggunaan Vue I18n

## Pengenalan

File ini berisi petunjuk penggunaan Vue I18n untuk aplikasi Faktur. Vue I18n digunakan untuk mengelola terjemahan bahasa di seluruh aplikasi.

## Struktur Terjemahan

Terjemahan dikelompokkan dalam struktur berikut:

```javascript
{
  id: {            // Bahasa Indonesia
    ui: { ... },   // Elemen UI - selalu dalam bahasa Indonesia
    invoice: { ... } // Konten invoice - bisa diterjemahkan
  },
  en: {            // Bahasa Inggris
    ui: { ... },   // Elemen UI - tetap dalam bahasa Indonesia
    invoice: { ... } // Konten invoice - diterjemahkan ke bahasa Inggris
  }
}
```

## Cara Menggunakan

### Dalam file setup

```javascript
import { useI18n } from 'vue-i18n';

// Di dalam setup
const { t, locale } = useI18n();

// Mengubah bahasa
function setLanguage(lang) {
  locale.value = lang;
  localStorage.setItem('preferred_language', lang);
}

// Menggunakan terjemahan
const message = t('invoice.date'); // Akan menghasilkan "Tanggal" atau "Date" tergantung locale
```

### Dalam template

```html
<template>
  <!-- Menggunakan terjemahan langsung -->
  <div>{{ $t('invoice.date') }}</div>
  
  <!-- Tombol untuk mengubah bahasa -->
  <button @click="setLanguage('id')">ID</button>
  <button @click="setLanguage('en')">EN</button>
</template>
```

## Menambahkan Terjemahan Baru

Untuk menambahkan terjemahan baru, tambahkan kunci dan nilai terjemahan ke file `src/i18n/index.js` di bawah namespace yang sesuai.

## Tips

1. Gunakan namespace yang konsisten untuk mengelompokkan terjemahan terkait
2. Pisahkan elemen UI dan konten yang dapat diterjemahkan
3. Gunakan format sederhana untuk kunci, misalnya: 'invoice.date', 'ui.fillData'
4. Pastikan semua kunci terjemahan ada di semua bahasa untuk menghindari fallback

## Referensi

- [Dokumentasi Vue I18n](https://vue-i18n.intlify.dev/) 