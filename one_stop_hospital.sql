-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2025 at 07:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `one_stop_hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `allergies`
--

CREATE TABLE `allergies` (
  `id` int(11) NOT NULL,
  `allergie` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `allergies`
--

INSERT INTO `allergies` (`id`, `allergie`, `description`, `pid`, `created_at`) VALUES
(1, 'cough', 'In Cold', 9, '2025-02-14 22:05:29'),
(2, 'cough', '65465', 4, '2025-02-14 22:14:56'),
(3, 'nininininin', 'sdfghjklwertyuioxcvbnm,', 1, '2025-02-15 08:39:42');

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `case_id` int(11) NOT NULL,
  `medicine_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `from_medicine` date NOT NULL,
  `to_medicine` date NOT NULL,
  `M` tinyint(1) DEFAULT 0,
  `A` tinyint(1) DEFAULT 0,
  `N` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `case_id`, `medicine_id`, `p_id`, `qty`, `amount`, `from_medicine`, `to_medicine`, `M`, `A`, `N`, `created_at`) VALUES
(7, 52, 1, 4, 1, 40.00, '2025-03-07', '2025-03-07', 0, 1, 1, '2025-03-07 10:26:13'),
(8, 53, 2, 4, 1, 44.00, '2025-03-07', '2025-03-07', 1, 0, 1, '2025-03-07 10:44:20');

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` int(11) NOT NULL,
  `p_id` int(11) DEFAULT NULL,
  `doc_id` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `description` text DEFAULT NULL,
  `disease` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`id`, `p_id`, `doc_id`, `date`, `description`, `disease`, `created_at`) VALUES
(10, 4, 1, '2021-01-01', 'Follow-up check', 'Asthma', '2025-02-15 19:42:42'),
(11, 4, 1, '2021-03-01', 'Respiratory Check-up', 'Stroke', '2025-02-15 19:42:43'),
(14, 4, 1, '2021-06-01', 'Routine Consultation', 'High BP', '2025-02-15 19:42:46'),
(15, 4, 1, '2021-09-01', 'Chronic Disease Follow-up', 'Kidney Disease', '2025-02-15 19:42:47'),
(16, 4, 1, '2022-01-01', 'Cognitive Function Check', 'Stroke', '2025-02-15 19:42:48'),
(17, 4, 1, '2022-03-01', 'Follow-up Visit', 'Heart Disease', '2025-02-15 19:42:49'),
(18, 4, 1, '2022-06-01', 'Cancer Screening', 'Smoking', '2025-02-15 19:42:50'),
(19, 4, 1, '2023-01-01', 'Neurological Monitoring', 'Stroke', '2025-02-15 19:42:51'),
(20, 4, 1, '2024-01-01', 'Emergency Care', 'Lung Cancer', '2025-02-15 19:42:52'),
(34, 4, 1, '2024-03-01', 'Organ Dysfunction Care', 'Hypertension', '2025-02-15 19:43:06'),
(36, 4, 1, '2024-05-01', 'Cancer Follow-up', 'Lung Cancer', '2025-02-15 19:43:08'),
(37, 4, 1, '2024-06-01', 'Heart Disease Check', 'Heart Disease', '2025-02-15 19:43:09'),
(40, 4, 1, '2024-07-01', 'Physical Therapy', 'Stroke', '2025-02-15 19:43:12'),
(41, 4, 1, '2024-09-01', 'Cardiology Visit', 'Stroke', '2025-02-15 19:43:13'),
(42, 4, 1, '2025-01-01', 'Cardiovascular Consultation', 'Heart Disease', '2025-02-15 19:43:14'),
(51, 4, 1, '2025-03-01', 'Cardiovascular Consultation', 'Heart Disease', '2025-02-17 19:43:14'),
(52, 4, 1, '2025-03-07', 'Temperature 102F', 'Stroke', '2025-03-07 10:22:22'),
(53, 4, 1, '2025-03-06', 'Patient was very ill. problem in breathing. and out of sight.', 'Lung Cancer', '2025-03-07 10:42:16');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `hospital_id` int(255) NOT NULL,
  `doctorname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `speciality` text NOT NULL,
  `address` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `hospital_id`, `doctorname`, `password`, `mobile`, `email`, `speciality`, `address`, `created_at`) VALUES
(1, 3, 'Rutik', '123456', '9979004452', 'onestophospital007@gmail.com', 'Eye', 'werfw', '2025-02-14 13:54:37'),
(2, 1, 'Rutik', '123456', '9979004453', 'rutikdobariya.rmd2024@gmail.com', 'Eye', '94, santiniketan', '2025-02-14 13:57:52'),
(3, 4, 'Rutik', '123456', '9979568458', 'civil_surat2024@gmail.com', 'Eye', 'sadsdf', '2025-02-14 16:59:06'),
(5, 3, 'Rutik', '32122+6', '9979004436', 'rutikdobariya.rmd2024@gmail.com', 'Eye', '9895', '2025-02-14 19:19:56'),
(6, 4, 'mina ben', '1478577', '4567891235', 'mina@gmail.com', 'mbbs', 'rajkot rangilu', '2025-02-15 08:20:58');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `id` int(11) NOT NULL,
  `hospitalname` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`id`, `hospitalname`, `mobile`, `email`, `address`, `created_at`) VALUES
(1, 'P P Mania', '9979004452', 'onestophospital007@gmail.com', '94', '2025-02-14 08:28:08'),
(3, 'Mania', '9979004454', 'onestophospital007@gmail.com', 'sd', '2025-02-14 09:48:06'),
(4, 'civil - surat', '9979568458', 'civil_surat2024@gmail.com', 'parvat patiya', '2025-02-14 14:06:20'),
(5, 'zyuds', '6589456752', 'kunj02@gmail.com', 'junagadh gir', '2025-02-15 08:19:38');

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int(11) NOT NULL,
  `medicinename` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `medicine_price` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `medicinename`, `description`, `created_at`, `medicine_price`) VALUES
(1, 'paracitamol', 'used as pain killer', '2025-02-14 13:20:19', 20.00),
(2, 'dolo', 'For High Fever', '2025-02-14 14:07:11', 22.00),
(3, 'Vix', 'Used for many purose', '2025-02-15 00:35:21', 56.00),
(4, 'paracetamol', 'use if fever', '2025-02-15 08:22:06', 55.00);

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `aadhar` varchar(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `username`, `password`, `mobile`, `aadhar`, `email`, `address`, `created_at`) VALUES
(1, 'rutik', '123456789', '9979004452', '258485248452', 'onestophospital007@gmail.com', '94, santiniketan', '2025-02-14 03:30:24'),
(4, 'Rutik', '12345678', '9979004452', '258485248453', 'rutikdobariya.rmd2024@gmail.com', '94, Santniketan Society Kathodara, Surat', '2025-02-14 06:46:23'),
(6, '115', '12345678', '9979004452', '258485248454', 'onestophospital007@gmail.com', '94', '2025-02-14 06:59:57'),
(7, 'rutik', '12345678', '9979004452', '258485248456', 'rutikdobariya.rmd2024@gmail.com', '94', '2025-02-14 07:08:59'),
(9, 'rutik', '12345678', '9979004452', '258485248457', 'onestophospital007@gmail.com', '94', '2025-02-14 07:13:29'),
(11, 'rutik', '12345678', '9979004452', '258485248458', 'onestophospital007@gmail.com', '94', '2025-02-14 07:14:18'),
(12, 'rutik', '12345678', '9979004452', '258485248459', 'onestophospital007@gmail.com', '94', '2025-02-14 07:19:10'),
(13, 'Rutik', '12345678', '9979004452', '258485248460', 'onestophospital007@gmail.com', '94. Santiniketan', '2025-02-14 07:30:33'),
(14, 'Rutik', '12345678', '9979004452', '258485248461', 'onestophospital007@gmail.com', '94', '2025-02-14 08:25:20'),
(15, 'rutik', 'j1jk3l135l', '9979004452', '258485248463', 'onestophospital007@gmail.com', 'sd', '2025-02-14 09:44:40'),
(16, 'rutik', '12345678', '9979004452', '258485248655', 'rutikdobariya.rmd2024@gmail.com', 'asd', '2025-02-14 14:02:29'),
(17, 'kunj', '12345678', '6356365709', '123456789123', 'kunj12@gmail.com', 'junagadh gir', '2025-02-15 08:18:34');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `case_id` int(11) NOT NULL,
  `doc_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `report_file` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `case_id`, `doc_id`, `description`, `report_file`, `created_at`, `type`) VALUES
(4, 52, 1, 'everything is normal in blood reports', '4.pptx', '2025-03-07 10:23:21', 'Your Report Type'),
(5, 53, 1, 'MRI shows no sights of lung damage.', '5.pptx', '2025-03-07 10:43:11', 'Your Report Type');

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

CREATE TABLE `vaccines` (
  `id` int(11) NOT NULL,
  `vaccine_name` varchar(255) NOT NULL,
  `date_of_vaccine` date NOT NULL,
  `description` text DEFAULT NULL,
  `p_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `vaccines`
--

INSERT INTO `vaccines` (`id`, `vaccine_name`, `date_of_vaccine`, `description`, `p_id`, `created_at`) VALUES
(1, 'covishield', '2025-02-21', 'For Covid Protection', 4, '2025-02-14 23:35:25'),
(2, 'covaccine', '2025-02-27', 'This is not efficient aas covishield', 4, '2025-02-14 23:36:09'),
(3, 'covishield', '2025-02-20', 'covishield is for covid', 6, '2025-02-15 04:14:14'),
(4, 'ababbabba', '2025-02-14', 'sjdbashcbsdiusdjhjhba', 1, '2025-02-15 08:37:26'),
(5, 'hello', '2025-02-14', 'ahshhshshshshsshssh', 1, '2025-02-15 08:39:09'),
(6, 'covishield', '2025-03-07', 'For fighting against corona', 4, '2025-03-07 10:24:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allergies`
--
ALTER TABLE `allergies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pid` (`pid`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case_id` (`case_id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `p_id` (`p_id`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `p_id` (`p_id`),
  ADD KEY `doc_id` (`doc_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD KEY `fk_hospital` (`hospital_id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `aadhar` (`aadhar`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case_id` (`case_id`),
  ADD KEY `doc_id` (`doc_id`);

--
-- Indexes for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `p_id` (`p_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allergies`
--
ALTER TABLE `allergies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `allergies`
--
ALTER TABLE `allergies`
  ADD CONSTRAINT `allergies_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `patients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bills_ibfk_3` FOREIGN KEY (`p_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `cases_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cases_ibfk_2` FOREIGN KEY (`doc_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `fk_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`doc_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD CONSTRAINT `vaccines_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
