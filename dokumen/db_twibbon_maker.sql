-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2021 at 03:56 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_twibbon_maker`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigner`
--

CREATE TABLE `campaigner` (
  `id_campaigner` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `nama_campaigner` varchar(25) NOT NULL,
  `notelp_campaigner` varchar(25) NOT NULL,
  `maks_kuota_campaigner` int(10) NOT NULL DEFAULT '200'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id_event` int(10) NOT NULL,
  `id_campaigner` int(10) NOT NULL,
  `nama_event` varchar(25) NOT NULL,
  `tanggal_event` datetime NOT NULL,
  `jumlah_anggota` int(10) NOT NULL,
  `template_twibbon` varchar(25) NOT NULL,
  `deskripsi_event` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `event_participant`
--

CREATE TABLE `event_participant` (
  `id_event_participant` int(10) NOT NULL,
  `id_event` int(10) NOT NULL,
  `id_participant` int(10) NOT NULL,
  `foto_participant` varchar(10) DEFAULT NULL,
  `tanggal_upload` datetime DEFAULT NULL,
  `hasil_foto` varchar(25) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updateAT` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `id_keranjang` int(10) NOT NULL,
  `id_campaigner` int(10) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `keranjang_produk`
--

CREATE TABLE `keranjang_produk` (
  `id_keranjang_produk` int(10) NOT NULL,
  `id_keranjang` int(10) NOT NULL,
  `id_produk` varchar(25) NOT NULL,
  `quantity` int(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `participant`
--

CREATE TABLE `participant` (
  `id_participant` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `nama_participant` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id_produk` varchar(10) NOT NULL,
  `nama_produk` varchar(25) NOT NULL,
  `harga_produk` int(20) NOT NULL,
  `kuota_produk` int(10) NOT NULL,
  `deskripsi_produk` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `produk_transaksi`
--

CREATE TABLE `produk_transaksi` (
  `id_produk_transaksi` int(10) NOT NULL,
  `id_transaksi` varchar(25) NOT NULL,
  `id_produk` varchar(25) NOT NULL,
  `quantity` int(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `id_promotion` int(10) NOT NULL,
  `id_campaigner` int(10) NOT NULL,
  `id_event` int(10) NOT NULL,
  `total_payment` int(20) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `active_till` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` varchar(25) NOT NULL,
  `id_campaigner` int(10) NOT NULL,
  `total_transaksi` int(20) DEFAULT NULL,
  `deskripsi_transaksi` text,
  `status_transaksi` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(10) NOT NULL,
  `email_user` varchar(25) NOT NULL,
  `username_user` varchar(25) NOT NULL,
  `password_user` varchar(256) NOT NULL,
  `status_user` tinyint(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaigner`
--
ALTER TABLE `campaigner`
  ADD PRIMARY KEY (`id_campaigner`),
  ADD KEY `foreignkey1` (`id_user`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id_event`),
  ADD KEY `fk_event_campaigner` (`id_campaigner`);

--
-- Indexes for table `event_participant`
--
ALTER TABLE `event_participant`
  ADD PRIMARY KEY (`id_event_participant`),
  ADD KEY `fk_1` (`id_participant`),
  ADD KEY `fk_2` (`id_event`);

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id_keranjang`),
  ADD KEY `fk_keranjang_campaigner` (`id_campaigner`);

--
-- Indexes for table `keranjang_produk`
--
ALTER TABLE `keranjang_produk`
  ADD PRIMARY KEY (`id_keranjang_produk`),
  ADD KEY `fk_keranjang_produk_1` (`id_keranjang`),
  ADD KEY `fk_keranjang_produk_2` (`id_produk`);

--
-- Indexes for table `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id_participant`),
  ADD KEY `foreignkey_participant` (`id_user`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indexes for table `produk_transaksi`
--
ALTER TABLE `produk_transaksi`
  ADD PRIMARY KEY (`id_produk_transaksi`),
  ADD KEY `fk_transaksi_produk_1` (`id_produk`),
  ADD KEY `fk_transaksi_produk_2` (`id_transaksi`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id_promotion`),
  ADD KEY `fk_campaigner_promotion` (`id_campaigner`),
  ADD KEY `fk_event_promotion` (`id_event`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `fk_campaigner_transaksi` (`id_campaigner`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaigner`
--
ALTER TABLE `campaigner`
  MODIFY `id_campaigner` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id_event` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_participant`
--
ALTER TABLE `event_participant`
  MODIFY `id_event_participant` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id_keranjang` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `keranjang_produk`
--
ALTER TABLE `keranjang_produk`
  MODIFY `id_keranjang_produk` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participant`
--
ALTER TABLE `participant`
  MODIFY `id_participant` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk_transaksi`
--
ALTER TABLE `produk_transaksi`
  MODIFY `id_produk_transaksi` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id_promotion` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `campaigner`
--
ALTER TABLE `campaigner`
  ADD CONSTRAINT `foreignkey1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `fk_event_campaigner` FOREIGN KEY (`id_campaigner`) REFERENCES `campaigner` (`id_campaigner`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `event_participant`
--
ALTER TABLE `event_participant`
  ADD CONSTRAINT `fk_1` FOREIGN KEY (`id_participant`) REFERENCES `participant` (`id_participant`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_2` FOREIGN KEY (`id_event`) REFERENCES `events` (`id_event`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD CONSTRAINT `fk_keranjang_campaigner` FOREIGN KEY (`id_campaigner`) REFERENCES `campaigner` (`id_campaigner`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `keranjang_produk`
--
ALTER TABLE `keranjang_produk`
  ADD CONSTRAINT `fk_keranjang_produk_1` FOREIGN KEY (`id_keranjang`) REFERENCES `keranjang` (`id_keranjang`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_keranjang_produk_2` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `foreignkey_participant` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `produk_transaksi`
--
ALTER TABLE `produk_transaksi`
  ADD CONSTRAINT `fk_transaksi_produk_1` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_transaksi_produk_2` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `promotion`
--
ALTER TABLE `promotion`
  ADD CONSTRAINT `fk_campaigner_promotion` FOREIGN KEY (`id_campaigner`) REFERENCES `campaigner` (`id_campaigner`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_event_promotion` FOREIGN KEY (`id_event`) REFERENCES `events` (`id_event`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk_campaigner_transaksi` FOREIGN KEY (`id_campaigner`) REFERENCES `campaigner` (`id_campaigner`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
