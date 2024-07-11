-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2023 at 10:14 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `banksoal`
--

-- --------------------------------------------------------

--
-- Table structure for table `aspek_praktek`
--

CREATE TABLE `aspek_praktek` (
  `nomor` int(255) NOT NULL,
  `aspek_dinilai` text NOT NULL,
  `id_soal` varchar(150) NOT NULL,
  `skor0` tinyint(1) NOT NULL,
  `skor1` tinyint(1) NOT NULL,
  `skor2` tinyint(1) NOT NULL,
  `ket_skor0` varchar(500) NOT NULL,
  `ket_skor1` varchar(500) NOT NULL,
  `ket_skor2` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aspek_praktek`
--

INSERT INTO `aspek_praktek` (`nomor`, `aspek_dinilai`, `id_soal`, `skor0`, `skor1`, `skor2`, `ket_skor0`, `ket_skor1`, `ket_skor2`) VALUES
(9, '<p>Memverbalkan instruksi yang harus dilakukan pasien sebelum pemeriksaan : ada</p>\n<ul>\n<li>Tidak merokok minimal<br>1 jam sebelum pemeriksaan.</li>\n<li>Tidak<br>melakukan tindakan kebersihan mulut minimal 1 jam sebelum<br>pemeriksaan.</li>\n</ul>', '2JAd3YY2ABNlMWyO7Wersx3tEuGNpXvC', 1, 1, 1, 'tidak memverbalkan. ', 'memverbalkan 1-2 instruksi dengan benar', 'memverbalkan 3-4 instruksi dengan benar');

-- --------------------------------------------------------

--
-- Table structure for table `penulis`
--

CREATE TABLE `penulis` (
  `nomor` int(255) NOT NULL,
  `id` varchar(50) NOT NULL,
  `departemen` varchar(30) NOT NULL,
  `nama_departemen` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `status` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penulis`
--

INSERT INTO `penulis` (`nomor`, `id`, `departemen`, `nama_departemen`, `email`, `password`, `first_name`, `last_name`, `status`) VALUES
(5, 'IVgib1Gt2xYBPEFNJBiKdFNJnfSrN1w6', '', '', 'admin@gmail.com', 'admin', 'admin', 'account', 1),
(6, 'DQGX3aCamBnWmB2xcLe75v5GEwyWSCVi', '1', 'Biologi Oral', 'wahyu@gmail.com', 'wahyu', 'wahyu', 'ilahi', 1),
(7, 'hGa5AFrjG6gRvvEoyUuXHBJUIrSV7F4i', '13', 'Biomedik', 'biomedik@gmail.com', 'biomedik', 'departemen', 'biomedik', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('EEy3SNu2lvuiaikVsNkB7zxzClisQcdA', 1689495096, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-07-16T03:14:52.566Z\",\"httpOnly\":true,\"path\":\"/\"},\"email\":\"wahyu@gmail.com\",\"departemen\":\"1\",\"namaDepartemen\":\"Biologi Oral\",\"nama\":\"wahyu ilahi\",\"isAuthenticated\":true,\"isAdmin\":false}');

-- --------------------------------------------------------

--
-- Table structure for table `soal_praktek`
--

CREATE TABLE `soal_praktek` (
  `nomor` int(255) NOT NULL,
  `id` varchar(150) NOT NULL,
  `pembuat` varchar(50) NOT NULL,
  `tinjauan1` varchar(15) NOT NULL,
  `tinjauan2` varchar(15) NOT NULL,
  `subtinjauan2` varchar(15) NOT NULL,
  `tinjauan3` varchar(15) NOT NULL,
  `tinjauan4` varchar(15) NOT NULL,
  `tujuan` text NOT NULL,
  `skenario_klinik` text NOT NULL,
  `tugas_kandidat` text NOT NULL,
  `tugas_penguji` text NOT NULL,
  `intruksi_pasien` text NOT NULL,
  `peralatan` text NOT NULL,
  `gambar1` varchar(100) NOT NULL,
  `gambar2` varchar(100) NOT NULL,
  `departemen` varchar(50) NOT NULL,
  `nama_departemen` varchar(50) NOT NULL,
  `referensi` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `bulan` int(10) NOT NULL,
  `tahun` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `soal_praktek`
--

INSERT INTO `soal_praktek` (`nomor`, `id`, `pembuat`, `tinjauan1`, `tinjauan2`, `subtinjauan2`, `tinjauan3`, `tinjauan4`, `tujuan`, `skenario_klinik`, `tugas_kandidat`, `tugas_penguji`, `intruksi_pasien`, `peralatan`, `gambar1`, `gambar2`, `departemen`, `nama_departemen`, `referensi`, `status`, `bulan`, `tahun`) VALUES
(4, '2JAd3YY2ABNlMWyO7Wersx3tEuGNpXvC', 'wahyu ilahi', '03.1', 'KP.2', 'P.02', 'S.2', 'K.04', '<ol>\n<li>Menilai kemampuan kandidat dalam melakukan komunikasi, informasi, dan edukasi</li>\n<li>Menilai kemampuan kandidat dalam mengukur dan menginterpretasi hasil sialometri</li>\n</ol>', '<p>Seorang perempuan berusia 58 tahun datang ke RSGM dengan keluhan mulut terasa kering sehingga sulit berbicara dan menelan makanan kering sejak 6 bulan yang lalu. Selain itu, pasien juga mengeluhkan bau mulut dan lidah terasa perih sejak 2 bulan yang lalu. Riwayat diabetes mellitus dan hipertensi dengan konsumsi rutin Captopril sejak 10 tahun yang lalu. &nbsp;Pada pemeriksaan intra oral tampak coating putih kekuningan tebal disertai&nbsp;<em>fissure</em>&nbsp;pada permukaan dorsal lidah.&nbsp;<em>Pooling saliva</em>&nbsp;(-), berbuih, kaca mulut lengket. Tidak ada keluhan pada bagian tubuh lainnya.</p>', '<ol>\n<li>Verbalkan instruksi yang harus diberikan kepada pasien sebelum melakukan pemeriksaan laju alir saliva!</li>\n<li>Tunjukkan dan verbalkan alat dan bahan yang digunakan !</li>\n<li>Verbalkan cara pengukuran laju alir saliva tanpa stimulasi dengan metode&nbsp;<em>Drolling,&nbsp;</em>beserta interpretasinya !</li>\n<li>Verbalkan cara pengukuran laju alir saliva dengan stimulasi mastikasi, beserta interpretasinya !</li>\n</ol>', '<ol>\n<li>Penguji mengamati dan menilai peserta berdasarkan lembar penilaian.</li>\n<li>Penguji duduk di posisi yang dapat melihat dengan jelas apa yang dilakukan oleh kandidat dan tidak mengganggu kandidat.</li>\n<li>Penguji tidak diperbolehkan melakukan interupsi ataupun bertanya kepada peserta selain yang ditentukan</li>\n<li>Penguji mengisi <em>Global Performance Scale</em> (GPS).</li>\n<li>Penguji mengingatkan kepada peserta saat waktu&nbsp; yang tersisa 3 menit lagi (jika diperlukan)</li>\n<li>Penguji menyiapkan peralatan untuk peserta ujian berikutnya.</li>\n<li>&nbsp;</li>\n</ol>', '<p>Tidak ada</p>', '<ol>\n<li>Satu set komputer atau laptop</li>\n<li>Satu set lembar checklist</li>\n<li>Satu set skenario kandidat dan instruksi penguji</li>\n<li>Kursi penguji</li>\n<li>Meja dan kursi kandidat</li>\n<li>Alat tulis kantor (ATK)</li>\n<li>Tempat sampah</li>\n<li>Oral diagnostic set</li>\n<li>Handscoen dan masker</li>\n<li>Saliva container berkalibrasi</li>\n<li>Stopwatch</li>\n<li>Larutan asam sitrat 1-2 % (label biru)</li>\n<li>Larutan garam fisiologis / NaCl 0,9 % (label merah)</li>\n<li>Larutan sukrosa (label hijau)</li>\n<li>Parafin wax / permen karet bebas gula</li>\n</ol>', 'images\\soal-praktek\\1689390269694_bg-1.jpg', 'images\\soal-praktek\\1689390269695_bg-login-abs.jpg', '1', 'Biologi Oral', '1.Jensen SB, Vissink A, Firth N. Contemporary oral medicine: a clinical approach to clinical practice. In: Salivary gland disorders and disease. Australia: Springler; 2019.p.1439,1447-8. 2. Scully C. Oral and maxillofacial medicine: the basis of diagnosis', 'diLokal', 7, 2023);

-- --------------------------------------------------------

--
-- Table structure for table `soal_teori`
--

CREATE TABLE `soal_teori` (
  `nomor` int(255) NOT NULL,
  `id` varchar(150) NOT NULL,
  `pembuat` varchar(50) NOT NULL,
  `tinjauan1` varchar(10) NOT NULL,
  `tinjauan2` varchar(10) NOT NULL,
  `tinjauan3` varchar(10) NOT NULL,
  `vignette` varchar(500) NOT NULL,
  `pertanyaan` varchar(500) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `jawabanA` varchar(50) NOT NULL,
  `jawabanB` varchar(50) NOT NULL,
  `jawabanC` varchar(50) NOT NULL,
  `jawabanD` varchar(50) NOT NULL,
  `jawabanE` varchar(50) NOT NULL,
  `kunci` varchar(10) NOT NULL,
  `departemen` varchar(50) NOT NULL,
  `nama_departemen` varchar(50) NOT NULL,
  `alasan_singkat` varchar(255) NOT NULL,
  `referensi` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `bulan` int(10) NOT NULL,
  `tahun` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `soal_teori`
--

INSERT INTO `soal_teori` (`nomor`, `id`, `pembuat`, `tinjauan1`, `tinjauan2`, `tinjauan3`, `vignette`, `pertanyaan`, `gambar`, `jawabanA`, `jawabanB`, `jawabanC`, `jawabanD`, `jawabanE`, `kunci`, `departemen`, `nama_departemen`, `alasan_singkat`, `referensi`, `status`, `bulan`, `tahun`) VALUES
(1, 'fapCXF4YQiXC8FrtSVQnt0gGwjHny6Ur', '3', '10.1', 'P.07', 'K.01', '<p>Seorang laki-laki berusia 50 tahun datang ke RSGM untuk melakukan pemasangan gigi tiruan. Pada pemeriksaan intraoral ditemukan garis hitam-biru pada marginal gingiva rahang atas dan bawah. Pasien tinggal di sekitar area pertambangan dan bekerja sebagai buruh pabrik sejak 20 tahun yang lalu, serta memiliki kebiasaan merokok non-filter 12 batang/hari sejak 30 tahun yang lalu.</p>', '<p>Dikenal dengan istilah apakah garis hitam-biru sepanjang marginal gingiva pada kasus tersebut ?</p>', '', 'Auspitz’s Sign', 'Burtonian Line', 'Linear Gingival', 'Gingivitis Marginalis', 'Koebner’s Phenomenon', 'C', '2', '', 'Reaksi timbal yang bersirkulasi dengan ion sulfur yang dilepaskan oleh aktivitas mikroba oral dapat menyebabkan pengendapan timbal sulfida pada interface gigi dan gingiva yang disebut sebagai', 'Babu MS, Murthy, Sasidharan S. Burton’s line. The American Journal of Medicine. 2012;125(10): 1-2.', 'di Lokal', 7, 2023),
(2, 'cZE0d0rJ349Zb28NMvW5wkj6UmnC7tis', '3', '03.1', 'P.04', 'K.0c', '<p>Seorang pasien perempuan berusia 19 tahun datang ke RSGM dengan keluhan lidah terasa perih sejak 1 minggu yang lalu. Pada pemeriksaan intraoral tampak area depapilasi eritematosa yang dikelilingi keratinisasi berwarna putih keabuan pada 1/3 anterior dorsal dan lateral lidah kiri. Lesi tersebut hilang timbul dengan lokasi dan pola yang berbeda. Pasien memiliki riwayat alergi Ibuprofen.</p>', '<p>Apakah kemungkinan diagnosis dari kasus tersebut ?</p>', '', 'Coated Tongue', 'Hunter’s Glossitis', 'Geographic Tongue', 'Median Rhomboid Glossitis', 'Pseudomembranous Candidiasis', 'C', '5', '', 'Gambaran klinis geographic tongue ditandai adanya area putih serpiginous (seperti ular) di sekitar permukaan lidah yang atrofi. Lesi dapat ditemukan pada satu area dan kemudian muncul di area lain dengan sangat cepat yang cenderung mengalami perubahan lok', 'Picciani BLS, Teixeira-Souza T, Fernando H, Gonzaga DS, Gripp AC. Geographic tongue and psoriasis: clinical, histopathological, immunohistochemical and genetic correlation-a literature review. An Bras Dermatol. 2016;91(4):410-21.', 'di Lokal', 7, 2023),
(3, 'RnxqSYPryN0NMU9jzZyiz4fRujie8eZj', '3', '10.1', 'P.15', 'K.01', '<p>Seorang perempuan berusia 21 tahun datang ke RSGM dengan keluhan lidah terasa perih dan panas sejak 1 bulan yang lalu. Pasien merasa lemas dan mudah lelah disertai telapak tangan dan kaki yang sering kesemutan. Sejak 1 tahun terakhir pasien menjadi vegetarian. Pada pemeriksaan intra oral tampak depapilasi dorsal lidah menyeluruh.</p>', '<p>Apakah kemungkinan diagnosis oral dari kasus di atas ?</p>', 'images\\soal-teori\\1689065689922_bg-login-abs.jpg', 'Oral Mukositis', 'Hunter’s Glossitis', 'Geographic Tongue', 'Acute Athropic Candidiasis', 'Median Rhomboid Glossitis', 'B', '1', '', 'Vitamin B12 tidak terkandung di dalam sayur. Defisiensi dari vitamin B12 dapat menyebabkan anemia megaloblastik yang bermanifestasi oral berupa depapilasi dan beefy red pada lidah yang dikenal sebagai Hunter’s glossitis.', 'Prabhu SR. Halitosis. Textbook of oral medicine. India: Oxford university press, 2004: 180-2.', 'di Lokal', 7, 2023),
(4, 'rcmlfiMo611uOonruFt43nXFStlZIR8b', '11', '02.1', 'P.02', 'K.0c', '<p>Seorang perempuan berusia 21 tahun datang ke RSGM dengan keluhan lidah terasa perih dan panas sejak 1 bulan yang lalu. Pasien merasa lemas dan mudah lelah disertai telapak tangan dan kaki yang sering kesemutan. Sejak 1 tahun terakhir pasien menjadi vegetarian. Pada pemeriksaan intraoral tampak depapilasi dorsal lidah menyeluruh.</p>', '<p>Defisiensi vitamin apakah yang paling mungkin menyebakan kondisi tersebut?</p>', '', 'Niacin', 'Tiamin', 'Riboflavin', 'Sianokobalamin', 'Asam Folat', 'D', '6', '', 'Vitamin B12 tidak terkandung di dalam sayur. Defisiensi dari vitamin B12 dapat menyebabkan anemia megaloblastik yang bermanifestasi oral berupa depapilasi dan beefy red pada lidah.', 'Prabhu SR. Anemia of oral significance. Textbook of oral medicine. India: Oxford university press, 2004: 180-2.', 'di Lokal', 7, 2023),
(5, 'OxWxm4NWRCcHejStAJizQMRc7svebYAZ', 'wahyu ilahi', '02.1', 'P.05', 'K.0b', '<p>Seorang pasien laki-laki datang ke RSGM atas rujukan dari Puskesmas dengan keluhan sariawan berulang sejak 1 tahun yang lalu. Saat ini pasien juga mengeluhkan mata terasa perih serta nyeri saat berkemih. Pada pemeriksaan intraoral ditemukan ulser multiple, reguler, oval, dasar putih, diameter 1-5 mm pada mukosa labial regio 34, mukosa bukal regio 16-17, lateral dan ventral lidah, serta palatum molle. Pasien memiliki riwayat alergi Penicillin.</p>', '<p>Apakah kemungkinan diagnosis dari kasus tersebut ?</p>', '', 'Crohn’s Disease', 'Stomatitis Alergika', 'Behcet’s Syndrome', 'Sjogren’s Syndrome', 'Recurrent Aphthous Stomatitis', 'C', '6', '', 'Behcet’s syndrome adalah penyakit yang dikarakteristikkan dengan ulserasi oral berulang yang berhubungan dengan ulser genital, kelainan mata (uveitis), dan kulit, serta dapat bermanifestasi pada vaskular, sendi, dan saraf.', 'Prabhu SR. Oral disease of immunological background. Textbook of oral medicine. India: Oxford university press, 2004: 196.', 'di Lokal', 7, 2023),
(6, 'B2YbCTUjEFmdriyFgCC0T9eWJXpHO3Vy', 'wahyu ilahi', '03.1', 'P.02', 'K.0d', '<p>departemen 11</p>', '<p>departemen 11</p>', '', 'a', 'a', 'a', 'a', 'a', 'A', '11', '', 'a', 'a', 'di Lokal', 7, 2023),
(7, 'ytxbXaNItfiGpNWp2yZvbqu6fGFiAMzJ', 'departemen biomedik', '02.1', 'P.03', 'K.0b', '<p>biomedik</p>', '<p>biomedik</p>', '', 'a', 'a', 'a', 'a', 'a', 'B', '13', 'Biomedik', '', '', 'di Lokal', 7, 2023),
(8, 'HH0MFHS9cWqDQpETMXonxINi6ysALsuO', 'departemen biomedik', '02.1', 'P.01', 'K.0b', '<p>biomedik 2</p>', '<p>biomedik 2</p>', '', 'biomedik 2', 'biomedik 2', 'biomedik 2', 'biomedik 2', 'biomedik 2', 'B', '13', 'Biomedik', 'biomedik 2', 'biomedik 2', 'di Lokal', 7, 2023),
(9, 'mQmQOnGkQbl6JbcarFWKfr729OwAz6gk', 'admin account', '01.1', 'P.01', 'K.0b', '<p>admin</p>', '<p>admin</p>', 'images\\soal-teori\\1689220062542_bg-login-abs.jpg', 'a', 'b', 'c', 'd', 'e', 'B', '2', 'Dental Material', 'admin', '', 'di Lokal', 7, 2023);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aspek_praktek`
--
ALTER TABLE `aspek_praktek`
  ADD PRIMARY KEY (`nomor`);

--
-- Indexes for table `penulis`
--
ALTER TABLE `penulis`
  ADD PRIMARY KEY (`nomor`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `soal_praktek`
--
ALTER TABLE `soal_praktek`
  ADD PRIMARY KEY (`nomor`);

--
-- Indexes for table `soal_teori`
--
ALTER TABLE `soal_teori`
  ADD PRIMARY KEY (`nomor`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aspek_praktek`
--
ALTER TABLE `aspek_praktek`
  MODIFY `nomor` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `penulis`
--
ALTER TABLE `penulis`
  MODIFY `nomor` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `soal_praktek`
--
ALTER TABLE `soal_praktek`
  MODIFY `nomor` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `soal_teori`
--
ALTER TABLE `soal_teori`
  MODIFY `nomor` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
