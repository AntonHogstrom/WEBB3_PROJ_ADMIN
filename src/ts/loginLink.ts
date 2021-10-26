let loginLink: any = document.getElementById('loginLink');
let adminLink: any = document.getElementById('adminLink');
let homeLink: any = document.getElementById('homeLink');

if(window.location.hostname == "localhost") {
    loginLink.href = "http://localhost/portfolio_admin/pub/login.php?logout";
    adminLink.href = "http://localhost/portfolio_admin/pub/admin.php";
    homeLink.href = "http://localhost/portfolio_client/pub/";
} else {
    loginLink.href = "https://devnoe.com/MIUN/WEBB3PROJ/portfolio_admin/login.php?logout";
    adminLink.href = "https://devnoe.com/MIUN/WEBB3PROJ/portfolio_admin/admin.php";
    homeLink.href = "https://devnoe.com/MIUN/WEBB3PROJ/portfolio_client/";
}