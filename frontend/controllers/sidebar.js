const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const sidebarBtn = document.getElementById('sidebar-btn');


menuBtn.addEventListener('click', ()=>{
    sidebar.classList.toggle('minimize');
    if (document.body.classList.toggle('sidebar-hidden')) {
        sidebar.classList.toggle('minimize');
    }
});

sidebarBtn.addEventListener('click',()=>{
    document.body.classList.toggle('sidebar-hidden');
}) 

