Tabel Rute API

👥 Autentikasi & Pengguna

|

| Metode | Rute | Deskripsi | Auth Diperlukan | Peran |
| GET | / | Cek status API | Tidak | - |
| POST | /api/v1/auth/register | Mendaftar pengguna baru | Tidak | - |
| POST | /api/v1/auth/login | Login pengguna | Tidak | - |
| POST | /api/v1/auth/logout | Logout pengguna | Ya | Semua |
| POST | /api/v1/auth/refresh | Perbarui token akses | Ya | Semua |
| GET | /api/v1/auth/me | Dapatkan profil pengguna saat ini | Ya | Semua |
| PUT | /api/v1/auth/me | Perbarui profil pengguna saat ini | Ya | Semua |
| PUT | /api/v1/auth/password | Ubah kata sandi | Ya | Semua |
| GET | /api/v1/users | Dapatkan semua pengguna (dengan paginasi) | Ya | Admin |
| POST | /api/v1/users | Buat pengguna baru | Tidak | Admin |
| GET | /api/v1/users/role/:role | Dapatkan pengguna berdasarkan peran | Ya | Admin |
| GET | /api/v1/users/:id | Dapatkan pengguna berdasarkan ID | Ya | Admin, Pengguna |
| PATCH | /api/v1/users/:id | Perbarui pengguna | Ya | Admin, Pengguna (milik sendiri) |
| DELETE | /api/v1/users/:id | Hapus pengguna | Ya | Admin |
📚 Kursus, Modul, & Pelajaran

| Metode | Rute | Deskripsi | Auth Diperlukan | Peran |
| GET | /api/v1/courses | Dapatkan daftar kursus | Tidak | Semua |
| POST | /api/v1/courses | Buat kursus baru | Ya | Admin, Instruktur |
| GET | /api/v1/courses/:id | Dapatkan kursus berdasarkan ID | Tidak | Semua |
| PATCH | /api/v1/courses/:id | Perbarui kursus berdasarkan ID | Ya | Admin, Instruktur |
| DELETE | /api/v1/courses/:id | Hapus kursus berdasarkan ID | Ya | Admin, Instruktur |
| GET | /api/v1/course-modules | Dapatkan semua modul kursus | Tidak | Semua |
| POST | /api/v1/course-modules | Buat modul kursus baru | Ya | Admin, Instruktur |
| GET | /api/v1/course-modules/:id | Dapatkan modul kursus berdasarkan ID | Tidak | Semua |
| PATCH | /api/v1/course-modules/:id | Perbarui modul kursus berdasarkan ID | Ya | Admin, Instruktur |
| DELETE | /api/v1/course-modules/:id | Hapus modul kursus berdasarkan ID | Ya | Admin, Instruktur |
| GET | /api/v1/lessons | Dapatkan semua pelajaran | Tidak | Semua |
| POST | /api/v1/lessons | Buat pelajaran baru | Ya | Admin, Instruktur |
| GET | /api/v1/lessons/:id | Dapatkan pelajaran berdasarkan ID | Tidak | Semua |
| PATCH | /api/v1/lessons/:id | Perbarui pelajaran berdasarkan ID | Ya | Admin, Instruktur |
| DELETE | /api/v1/lessons/:id | Hapus pelajaran berdasarkan ID | Ya | Admin, Instruktur |
| POST | /api/v1/lesson-progresses | Buat kemajuan pelajaran | Ya | Pelajar |
| GET | /api/v1/lesson-progresses | Dapatkan semua kemajuan pelajaran | Ya | Admin, Instruktur |
| GET | /api/v1/lesson-progresses/:id | Dapatkan kemajuan pelajaran berdasarkan ID | Ya | Admin, Instruktur, Pelajar (milik sendiri) |
| PATCH | /api/v1/lesson-progresses/:id | Perbarui kemajuan pelajaran berdasarkan ID | Ya | Pelajar (milik sendiri), Admin |
| DELETE | /api/v1/lesson-progresses/:id | Hapus kemajuan pelajaran berdasarkan ID | Ya | Admin |
📝 Tugas & Penilaian

| Metode | Rute | Deskripsi | Auth Diperlukan | Peran |
| GET | /api/v1/assignments | Dapatkan semua tugas | Tidak | Semua |
| POST | /api/v1/assignments | Buat tugas baru | Ya | Admin, Instruktur |
| GET | /api/v1/assignments/:id | Dapatkan tugas berdasarkan ID | Tidak | Semua |
| PATCH | /api/v1/assignments/:id | Perbarui tugas berdasarkan ID | Ya | Admin, Instruktur |
| DELETE | /api/v1/assignments/:id | Hapus tugas berdasarkan ID | Ya | Admin, Instruktur |
| POST | /api/v1/assignment-submissions | Kirim tugas | Ya | Pelajar |
| GET | /api/v1/assignment-submissions | Dapatkan semua kiriman tugas | Ya | Admin, Instruktur |
| GET | /api/v1/assignment-submissions/:id | Dapatkan kiriman tugas berdasarkan ID | Ya | Admin, Instruktur, Pelajar (milik sendiri) |
| PATCH | /api/v1/assignment-submissions/:id | Perbarui kiriman tugas berdasarkan ID | Ya | Admin, Instruktur |
| DELETE | /api/v1/assignment-submissions/:id | Hapus kiriman tugas berdasarkan ID | Ya | Admin, Instruktur, Pelajar (milik sendiri) |
🛒 Belanja & Pembayaran

| Metode | Rute | Deskripsi | Auth Diperlukan | Peran |
| POST | /api/v1/carts | Tambah item ke keranjang | Ya | Semua |
| PUT | /api/v1/carts/:cartItemId | Perbarui item keranjang | Ya | Semua |
| GET | /api/v1/carts/:userId | Dapatkan keranjang berdasarkan pengguna | Ya | Semua |
| DELETE | /api/v1/carts/:cartItemId | Hapus item keranjang | Ya | Semua |
| POST | /api/v1/payments | Buat pembayaran | Ya | Semua |
| GET | /api/v1/payments | Dapatkan semua pembayaran | Ya | Admin |
| GET | /api/v1/payments/:id | Dapatkan pembayaran berdasarkan ID | Ya | Admin, Pengguna (milik sendiri) |
| PUT | /api/v1/payments/:id | Perbarui pembayaran | Ya | Admin |
| DELETE | /api/v1/payments/:id | Hapus pembayaran | Ya | Admin |
🎓 Pendaftaran & Sertifikat

| Metode | Rute | Deskripsi | Auth Diperlukan | Peran |
| POST | /api/v1/course-enrollments/:paymentId | Daftarkan pelajar ke kursus | Ya | Semua |
| GET | /api/v1/course-enrollments | Dapatkan semua pendaftaran kursus | Ya | Admin |
| GET | /api/v1/course-enrollments/:id | Dapatkan pendaftaran berdasarkan ID | Ya | Admin, Pengguna (milik sendiri) |
| PUT | /api/v1/course-enrollments/:id | Perbarui pendaftaran | Ya | Admin |
| DELETE | /api/v1/course-enrollments/:id | Hapus pendaftaran | Ya | Admin |
| GET | /api/v1/certificates | Dapatkan semua sertifikat | Tidak | Semua |
| POST | /api/v1/certificates | Keluarkan sertifikat | Ya | Admin, Instruktur |
| GET | /api/v1/certificates/:id | Dapatkan sertifikat berdasarkan ID | Tidak | Semua |
| DELETE | /api/v1/certificates/:id | Hapus sertifikat | Ya | Admin |
🛍️ Produk & Ulasan

| Metode | Rute | Deskripsi | Auth Diperlukan | Peran |
| GET | /api/v1/products | Dapatkan semua produk | Tidak | Semua |
| POST | /api/v1/products | Buat produk baru | Ya | Admin |
| GET | /api/v1/products/:id | Dapatkan produk berdasarkan ID | Tidak | Semua |
| PATCH | /api/v1/products/:id | Perbarui produk berdasarkan ID | Ya | Admin |
| DELETE | /api/v1/products/:id | Hapus produk berdasarkan ID | Ya | Admin |
| GET | /api/v1/product-reviews | Dapatkan semua ulasan produk | Tidak | Semua |
| POST | /api/v1/product-reviews | Buat ulasan produk | Ya | Semua |
| GET | /api/v1/product-reviews/:id | Dapatkan ulasan produk berdasarkan ID | Tidak | Semua |
| PATCH | /api/v1/product-reviews/:id | Perbarui ulasan produk berdasarkan ID | Ya | Admin, Pengguna (milik sendiri) |
| DELETE | /api/v1/product-reviews/:id | Hapus ulasan produk berdasarkan ID | Ya | Admin, Pengguna (milik sendiri) |
📦 Pesanan Produk

| Metode | Rute | Deskripsi | Auth Diperlukan | Peran |
| GET | /api/v1/product-orders | Dapatkan semua pesanan produk | Ya | Admin |
| POST | /api/v1/product-orders | Buat pesanan produk | Ya | Semua |
| GET | /api/v1/product-orders/:id | Dapatkan pesanan produk berdasarkan ID | Ya | Admin, Pengguna (milik sendiri) |
| PATCH | /api/v1/product-orders/:id | Perbarui pesanan produk berdasarkan ID | Ya | Admin |
| DELETE | /api/v1/product-orders/:id | Hapus pesanan produk berdasarkan ID | Ya | Admin |
| GET | /api/v1/product-order-items | Dapatkan semua item pesanan produk | Ya | Admin |
| POST | /api/v1/product-order-items | Buat item pesanan produk baru | Ya | Admin |
| GET | /api/v1/product-order-items/:id | Dapatkan item pesanan produk berdasarkan ID | Ya | Admin |
| PATCH | /api/v1/product-order-items/:id | Perbarui item pesanan produk berdasarkan ID | Ya | Admin |
| DELETE | /api/v1/product-order-items/:id | Hapus item pesanan produk berdasarkan ID | Ya | Admin |