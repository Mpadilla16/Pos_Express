
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');
const sidebarBtn = document.getElementById('sidebar-btn');

sidebarBtn.addEventListener('click',()=>{
    document.body.classList.toggle('sidebar-hidden');
})

menuBtn.addEventListener('click', ()=>{
    sidebar.classList.toggle('minimize');
});

