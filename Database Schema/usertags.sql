-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2020 at 07:10 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usertags`
--

-- --------------------------------------------------------

--
-- Table structure for table `usertags`
--

CREATE TABLE `usertags` (
  `id` int(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `code` varchar(30) NOT NULL,
  `tag` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usertags`
--

INSERT INTO `usertags` (`id`, `email`, `code`, `tag`) VALUES
(1, 'a@gmail.com', 'CHEFZERO', 'first'),
(2, 'a@gmail.com', 'CHEFZERO', 'second'),
(3, 'a@gmail.com', 'UNIVMT', 'third'),
(4, 'a@gmail.com', 'UNIVMT', 'fourth'),
(5, 'a@gmail.com', 'CDWY01', 'string'),
(6, 'a@gmail.com', 'CDWY01', 'palindrome'),
(7, 'a@gmail.com', 'CDWY01', 'fifth'),
(17, 'a@gmail.com', 'CDWY01', 'ok'),
(18, 'a@gmail.com', 'CDWY01', 'done'),
(19, 'a@gmail.com', 'CHEFZERO', 'Zero'),
(20, 'a@gmail.com', 'SWAPMATR', 'Zero');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `usertags`
--
ALTER TABLE `usertags`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usertags`
--
ALTER TABLE `usertags`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
