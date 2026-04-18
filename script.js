const toggleInput = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    toggleInput.checked = true;
}

toggleInput.addEventListener('change', function() {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {

            // active 클래스 이동
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // 카드 보이기/숨기기
            projectCards.forEach(function(card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}