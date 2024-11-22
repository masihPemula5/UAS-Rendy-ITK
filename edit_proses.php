<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'koneksi.php';

$id = $_POST['id'];
$nama = $_POST['nama'];
$nim = $_POST['nim'];
$email = $_POST['email'];
$nomor = $_POST['nomor'];
$jurusan = $_POST['jurusan'];

// Cek apakah NIM sudah ada di database dan bukan milik data yang sedang diedit
$query = "SELECT * FROM mahasiswa WHERE nim = '$nim' AND id != '$id'";
$result = mysqli_query($conn, $query);

if (!$result) {
    die("Query error: " . mysqli_error($conn));
}

if (mysqli_num_rows($result) > 0) {
    echo "<script>alert('NIM sudah ada! Masukkan NIM yang berbeda.'); window.location.href = 'index.php?id=$id';</script>";
} else {
    $update = "UPDATE mahasiswa SET nama='$nama', nim='$nim', email='$email', nomor='$nomor', jurusan='$jurusan' WHERE id='$id'";
    if (mysqli_query($conn, $update)) {
        echo "<script>alert('Data berhasil diupdate!'); window.location.href = 'index.php';</script>";
    } else {
        echo "<script>alert('Terjadi kesalahan! Data gagal diupdate.'); window.location.href = 'edit.php?id=$id';</script>";
    }
}

mysqli_close($conn);
?>