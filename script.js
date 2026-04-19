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

// GitHub API
const profileCard = document.getElementById('profile-card');
const repoList = document.getElementById('repo-list');

if (profileCard && repoList) {
    const username = 'Kimhyewon0621';

    // 프로필 정보 가져오기
    fetch('https://api.github.com/users/' + username)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            profileCard.innerHTML = `
                <img src="${data.avatar_url}" alt="GitHub Avatar" class="github-avatar">
                <div class="profile-info">
                    <h2>${data.name}</h2>
                    <p class="github-bio">${data.bio || 'No bio available'}</p>
                    <div class="profile-stats">
                        <div class="stat">
                            <span class="stat-number">${data.public_repos}</span>
                            <span class="stat-label">Repositories</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${data.followers}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${data.following}</span>
                            <span class="stat-label">Following</span>
                        </div>
                    </div>
                    <a href="${data.html_url}" class="btn btn-outline" target="_blank">View GitHub Profile</a>
                </div>
            `;
        })
        .catch(function(error) {
            profileCard.innerHTML = '<p>Failed to load profile.</p>';
        });

    // 저장소 목록 가져오기
    fetch('https://api.github.com/users/' + username + '/repos?sort=updated')
        .then(function(response) {
            return response.json();
        })
        .then(function(repos) {
            repoList.innerHTML = '';
            repos.forEach(function(repo) {
                const card = document.createElement('article');
                card.classList.add('repo-card', 'paper-card');
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description'}</p>
                    <div class="repo-stats">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                        <span>💻 ${repo.language || 'N/A'}</span>
                    </div>
                    <a href="${repo.html_url}" class="btn btn-outline" target="_blank">View Repository</a>
                `;
                repoList.appendChild(card);
            });
        })
        .catch(function(error) {
            repoList.innerHTML = '<p>Failed to load repositories.</p>';
        });
}
