document.addEventListener('DOMContentLoaded', () => {
    // Clean up existing HTML and build new envelope UI
    const body = document.body;
    body.innerHTML = `
        <div class="container">
            <header class="hero">
                <h1 class="page-title">My Confession</h1>
            </header>
            <div class="top-card">
                <div class="illustration">
                    <h1 class="title-large">💌</h1>
                </div>
            </div>

            <div class="envelope-wrap">
                <div class="envelope" id="envelope">
                    <div class="envelope-flap"></div>
                    <div class="envelope-body">
                        <div class="envelope-line"></div>
                        <div class="letter-content hidden" id="letterContent">
                            <div class="essay-display typewriter-paper">
                                <div id="typedText" class="typewriter-text"></div>
                            </div>
                        </div>
                    </div>
                    <div class="envelope-badge">❤</div>
                </div>
            </div>

            <div class="actions">
                <button id="openBtn" class="btn open-btn">OPEN THE LETTER</button>
            </div>
        </div>

        <div class="petal-animation" id="petalContainer"></div>
    `;

    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('openBtn');
    const letterContent = document.getElementById('letterContent');
    const typedText = document.getElementById('typedText');
    const petalContainer = document.getElementById('petalContainer');

    const speech = `Dear Arby,

Hindi ko alam kung makikita mo ito, pero may gusto lang sana akong sabihin.

Nagustuhan kita simula pa noong nag-start ang Grade 12. To be honest, hanggang ngayon hindi malinaw sakin kung bakit kita nagustuhan. Wala naman akong maibigay na exact reason. Siguro habang tumatagal, may mga bagay lang tungkol sa'yo na napansin ko at unti-unti kong nagustuhan.

Matagal ko nang gustong sabihin ito, pero hindi ako nagkaroon ng sapat na tapang para umamin. Kaya naisip kong sabihin na lang ito sa'yo ngayon sa pamamagitan ng website na ginawa ko, since isa ito sa mga hobbies ko.

Hindi ko rin alam kung kilala mo ako. For now, mas gusto ko na lang na manatiling hindi kilala o anonymous. Hindi ko rin ito sinasabi dahil may inaasahan akong sagot o anumang kapalit mula sa'yo. Gusto ko lang na malaman mo na may isang taong tahimik na humanga at nagkagusto sa'yo.

Ang masasabi ko lang para sa'yo ay good luck sa college. Sana maging successful ka sa path na tatahakin mo at sana mapili mo ang course na talagang para sa'yo at magpapasaya sa'yo. You deserve all the good things na darating sa buhay mo.

Ayun lang naman. Thank you for taking the time to read this.

Sincerely,
Anonymous`;

    let petalInterval = null;
    let isLetterOpen = false;
    let showLetterTimeout = null;
    let typewriterInterval = null;
    let typewriterIndex = 0;

    openBtn.addEventListener('click', () => {
        if (isLetterOpen) {
            closeLetter();
            return;
        }

        openLetter();
    });

    function openLetter() {
        isLetterOpen = true;
        openBtn.textContent = 'CLOSE THE LETTER';
        envelope.classList.add('open');
        document.body.classList.add('letter-open');

        showLetterTimeout = setTimeout(() => {
            letterContent.classList.remove('hidden');
            letterContent.classList.add('show');
            startTypewriter();
            startPetals();
        }, 500);
    }

    function closeLetter() {
        isLetterOpen = false;
        openBtn.textContent = 'OPEN THE LETTER';
        clearTimeout(showLetterTimeout);
        envelope.classList.remove('open');
        document.body.classList.remove('letter-open');
        letterContent.classList.add('hidden');
        letterContent.classList.remove('show');
        resetTypewriter();
        stopPetals();
    }

    function startTypewriter() {
        resetTypewriter();

        typewriterInterval = setInterval(() => {
            typedText.textContent = speech.slice(0, typewriterIndex + 1);
            typewriterIndex += 1;

            if (typewriterIndex > speech.length) {
                clearInterval(typewriterInterval);
                typewriterInterval = null;
                typedText.classList.add('done');
            }
        }, 42);
    }

    function resetTypewriter() {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
        typewriterIndex = 0;
        typedText.textContent = '';
        typedText.classList.remove('done');
        typedText.parentElement.scrollTop = 0;
    }

    function startPetals() {
        if (petalInterval) return;
        petalInterval = setInterval(createPetal, 250);
    }

    function stopPetals() {
        if (petalInterval) {
            clearInterval(petalInterval);
            petalInterval = null;
        }
    }

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = 8 + Math.random() * 10;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';

        const startX = Math.random() * 100;
        petal.style.left = startX + '%';
        petal.style.bottom = '-10px';

        const pinkShades = ['#ff6fa8', '#ff86b7', '#ff9ac5', '#ff5f9f'];
        petal.style.background = pinkShades[Math.floor(Math.random() * pinkShades.length)];

        const duration = 4 + Math.random() * 3;
        petal.style.animationDuration = duration + 's';

        petalContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, (duration + 0.5) * 1000);
    }
});
