const products = [
  {
    id: 1, 
    name: 'Sunny Graduation', 
    cat: 'wisuda', emoji: '🎓',
    price: 'Rp 95.000', badge: 'Best Seller',
    desc: 'Buket wisuda ceria dengan kombinasi bunga kuning & putih, cocok untuk momen kelulusan yang membahagiakan.',
    tags: ['Fresh Flower', 'Custom Ribbon', '3 Warna']
  },
  {
    id: 2, 
    name: 'Pink Dream', 
    cat: 'wisuda', emoji: '🌸',
    price: 'Rp 110.000', badge: 'New',
    desc: 'Dominasi warna pink pastel soft yang hits banget untuk foto wisuda. Dilengkapi baby breath yang cantik.',
    tags: ['Baby Breath', 'Pink Pastel', 'Aesthetic']
  },
  {
    id: 3, 
    name: 'Eternal Rose', 
    cat: 'anniversary', emoji: '🌹',
    price: 'Rp 185.000', badge: 'Premium',
    desc: 'Rangkaian mawar merah klasik untuk anniversary yang romantis. Dilengkapi pita satin dan kartu ucapan.',
    tags: ['Red Rose', 'Satin Ribbon', 'Message Card']
  },
  {
    id: 4, 
    name: 'Pastel Romance', 
    cat: 'anniversary', emoji: '💐',
    price: 'Rp 145.000', badge: '',
    desc: 'Perpaduan bunga pastel lavender dan peach yang lembut, mencerminkan cinta yang hangat dan tulus.',
    tags: ['Lavender', 'Peach', 'Pastel']
  },
  {
    id: 5, 
    name: 'Birthday Bloom', 
    cat: 'birthday', emoji: '🎂',
    price: 'Rp 120.000', badge: 'Popular',
    desc: 'Buket ulang tahun yang colourful dan playful! Bisa request warna favorit penerima.',
    tags: ['Colorful', 'Request Warna', 'Fun']
  },
  {
    id: 6, 
    name: 'Sweetheart Box', 
    cat: 'valentines', emoji: '❤️',
    price: 'Rp 175.000', badge: 'Valentine',
    desc: 'Paket spesial Valentine dengan buket mawar + cokelat + kartu ucapan romantis. Limited edition!',
    tags: ['Rose', 'Cokelat', 'Limited']
  },
  {
    id: 7, 
    name: 'Tulip Wonderland', 
    cat: 'anniversary', emoji: '🌷',
    price: 'Rp 210.000', badge: 'Premium',
    desc: 'Buket tulip impor warna-warni yang mewah. Cocok untuk perayaan pernikahan atau anniversary spesial.',
    tags: ['Tulip Impor', 'Luxury', 'Colorful']
  },
  {
    id: 8, name: 'Cotton Candy', cat: 'birthday', emoji: '🍬',
    price: 'Rp 98.000', badge: '',
    desc: 'Nuansa pastel pink dan putih bak cotton candy. Cocok banget untuk surprise ulang tahun yang manis!',
    tags: ['Pink & White', 'Pastel', 'Sweet']
  }
];

let currentProduct = null;

function renderProducts(cat = 'all') {
  $('#products-grid').html('');

  const filtered =
    cat === 'all'
      ? products
      : products.filter(p => p.cat === cat);

  filtered.forEach(p => {
    const card = `
      <div class="product-card" data-id="${p.id}">
        <div class="product-img">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <span>${p.emoji}</span>
        </div>

        <div class="product-info">
          <div class="product-cat">${p.cat}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-price">${p.price}</div>
        </div>
      </div>
    `;
    $('#products-grid').append(card);
  });
}

function filterProducts(cat, btn) {
  $('.filter-btn').removeClass('active');
  $(btn).addClass('active');
  renderProducts(cat);
}

function openModal(product) {
  currentProduct = product;

  $('#m-emoji').text(product.emoji);
  $('#m-name').text(product.name);
  $('#m-cat').text(product.cat.toUpperCase());
  $('#m-price').text(product.price);
  $('#m-desc').text(product.desc);
  $('#m-tags').html(
    product.tags.map(t => `<span>${t}</span>`).join('')
  );
  $('#modal').addClass('active');
  $('body').css('overflow', 'hidden');
}

function closeModalDirect() {
  $('#modal').removeClass('active');
  $('body').css('overflow', '');
}

function closeModal(e) {
  if ($(e.target).attr('id') === 'modal') {
    closeModalDirect();
  }
}

function orderProduct() {
  closeModalDirect();

  const cat = currentProduct?.cat || '';
  $('#f-need').val(
    cat.charAt(0).toUpperCase() + cat.slice(1)
  );
  $('#f-msg').val(
    `Halo! Saya ingin pesan "${currentProduct?.name}".`
  );
  $('#contact')[0].scrollIntoView({
    behavior: 'smooth'
  });
}

function calcEstimate() {
  const flowerMult = parseFloat($('#est-flower').val());
  const sizeBase = parseInt($('#est-size').val());
  const extra = parseInt($('#est-extra').val());
  const total =
    Math.round((sizeBase * flowerMult + extra) / 1000) * 1000;
  $('#est-price').text(
    'Rp ' + total.toLocaleString('id-ID')
  );
}

function orderFromEstimator() {
  const price = $('#est-price').text();

  $('#f-msg').val(
    `Saya ingin custom order dengan estimasi ${price}`
  );
  $('#contact')[0].scrollIntoView({
    behavior: 'smooth'
  });
  showToast('Detail estimasi berhasil dikirim 🌸');
}

function toggleFaq(btn) {
  const item = $(btn).closest('.faq-item');

  $('.faq-item').removeClass('open');
  if (!item.hasClass('open')) {
    item.addClass('open');
  }
}

function animateCounter(id, target, suffix = '') {
  let start = 0;

  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);

    $('#' + id).text(
      Math.floor(start).toLocaleString('id-ID') + suffix
    );

    if (start >= target) {
      clearInterval(timer);
    }
  }, 16);
}

function toggleMenu() {
  $('#nav-links').toggleClass('open');
}
$(window).on('scroll', function () {
  $('#navbar').toggleClass('scrolled',
    window.scrollY > 40);
});