

const modal = document.getElementById('modalForm');



function openModal() {
    modal.classList.add('active');
}
function closeModal() {
    modal.classList.remove('active');
}


window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

// kode AJAX

document.getElementById('tambahForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah form reload

    // Ambil data dari form
    const formData = new FormData(this);

    // Kirim data ke proses.php menggunakan fetch (AJAX)
    fetch('tambah_proses.php', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Respons gagal: ' + response.statusText);
            }
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data); // Debug respons data dari PHP
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Data berhasil ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                });
                closeModal();

                // Tambahkan data baru ke tabel
                const table = document.querySelector('table tbody');
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.nama}</td>
                    <td>${data.nim}</td>
                    <td>${data.email}</td>
                    <td>${data.nomor}</td>
                    <td>${data.jurusan}</td>
                    <td>
                       <a href='#' 
    class='editButton' 
style='color:white; background-color: green; padding: 5px'
                        data-id='{$row['id']}'
                        data-nama='{$row['nama']}'
                        data-nim='{$row['nim']}'
                        data-email='{$row['email']}'
                        data-nomor='{$row['nomor']}'
                        data-jurusan='{$row['jurusan']}'
    ><i class='fas fa-edit'></i> <span>Edit</span></a>
               
    <a style='color:white; background-color: red; padding: 5px;
    border-radius: 3px;' href='hapus.php?id=" . $row['id'] . "' onclick='return konfir(event, this)'>Hapus</a>
<script>
 function konfir(event, elem) {
  event.preventDefault();
  Swal.fire({
    title: 'Apakah Anda yakin ingin menghapus data ini?',
    text: 'Data yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1b76fd',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus data!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      // Misalnya proses penghapusan berhasil
      Swal.fire({
  title: 'Berhasil!',
  text: 'Data berhasil dihapus.',
  icon: 'success',
  showConfirmButton: false,
  timer: 1200
      }).then(() => {
        // Arahkan ke halaman yang diperlukan setelah alert sukses
        window.location.href = elem.href;
      });
    }
  });
}  
</script>
                    </td>
                `;
                table.appendChild(row);
            } else if (data.error === 'nim_sama') {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal menambahkan data!',
                    text: 'NIM sudah terdaftar!'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: data.message || 'Terjadi kesalahan.'
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Kesalahan server',
                text: 'Silakan coba lagi.'
            });
        });
});


//edit modal
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("editModal");
    const closeModal = document.getElementById("closeModal");

    // Tombol Edit
    const editButtons = document.querySelectorAll(".editButton");
    editButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Ambil data dari atribut data-*
            document.getElementById("editNama").value = this.getAttribute("data-nama");
            document.getElementById("editNim").value = this.getAttribute("data-nim");
            document.getElementById("editEmail").value = this.getAttribute("data-email");
            document.getElementById("editNomor").value = this.getAttribute("data-nomor");
            document.getElementById("editJurusan").value = this.getAttribute("data-jurusan");
            document.getElementById("editId").value = this.getAttribute("data-id");

        });
    });

    // Klik di luar modal untuk menutupnya
    overlay.addEventListener("click", function () {
        modal.style.display = "none";
        overlay.style.display = "none";
    });
});