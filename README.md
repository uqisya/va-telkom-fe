# VA Telkom FE

**Deskripsi Singkat**:  
Proyek ini adalah implementasi front-end untuk Virtual Assistant Telkom Indonesia yang memungkinkan pengguna berinteraksi dengan bot atau asisten virtual melalui antarmuka chat.

## Features

- **Tampilan Chat:**
  - Pengguna dapat memasukkan karakter maupun kalimat pada text area
  - Setiap pesan yang ditulis maupun balasan dari server akan ditampilkan ke layar pengguna
  - Setiap pesan memiliki nama pengirim (“Telkom Indonesia”, atau “Anda”)
- **Intruksi dengan Asisten Virtual:**
  - Pengguna dapat kirim pesan atau perintah dari FAQ yang tersedia
  - Bot/Asisten memberikan response sesuai data di database
- **Persistensi Data**:
  - Tampilan histori list percakapan
  - Tampilan isi detail histori percakapan

## User Interface Example


## Project Structure
```plaintext
va-telkom-fe/
├── public
├── src/
│   ├── assets
│   ├── components/
│   │   ├── ui/
│   │   └── ...
│   ├── enums/
│   │   └── enums.js
│   ├── lib/
│   ├── pages/
│   │   ├── HomeSessionScreen.jsx
│   │   └── ...
│   ├── services/
│   │   └── api.js
│   ├── App.css
│   └── ...
├── package.json
└── ...
```

## Teknologi yang Digunakan

- [**Vite**](https://vitejs.dev/): Development server dan build tool untuk proyek React.
- [**Axios**](https://axios-http.com/docs/intro): Untuk melakukan permintaan HTTP.
- [**Lucide-react**](https://lucide.dev/guide/installation): Library icon untuk React.
- [**React**](https://react.dev/): Library untuk membangun user interface.
- [**React-DOM**](https://www.npmjs.com/package/react-dom): Berfungsi untuk merender React ke dalam DOM.
- [**Sonner**](https://sonner.emilkowal.ski/): Library untuk notifikasi.
- [**TailwindCSS**](https://tailwindcss.com/): Framework CSS utility-first.
- [**Shadcn**](https://ui.shadcn.com/docs): Re-useable Komponen UI yang dikembangkan dengan TailwindCSS.


## Instalasi

1. **Clone Repository**:

    ```bash
    git clone https://github.com/uqisya/va-telkom-fe.git
    cd va-telkom-fe
    code .
    ```

2. **Install dependensi**:

    ```bash
    npm install
    ```

3. **Jalankan program**:

    ```bash
    npm run dev
    ```

    Pastikan Anda juga menjalankan program backend Laravel.

4. **Instruksi Backend**:

    Lihat instruksi project backend Laravel [di sini](https://github.com/uqisya/va-telkom-be) va-telkom-be.
