(() => {
  const properties = {
    'dera-mandi-estate.html': {
      title: 'Dera Mandi, South Delhi',
      items: {
        Hospitals: ['Fortis Hospital, Vasant Kunj', 'Indian Spinal Injuries Centre, Vasant Kunj'],
        Schools: ['The Heritage School, Vasant Kunj', 'Vasant Valley School'],
        'Metro access': ['Chhattarpur Metro Station', 'Qutub Minar Metro Station']
      }
    },
    'sultanpur-farms-estate.html': {
      title: 'Sultanpur Farm, South Delhi',
      items: {
        Hospitals: ['Fortis Hospital, Vasant Kunj', 'Artemis Hospital, Gurugram'],
        Schools: ['Pathways School, Gurgaon', 'The Heritage School, Gurgaon'],
        'Metro access': ['Sultanpur Metro Station', 'Chhattarpur Metro Station']
      }
    },
    'mg-road-farmhouse.html': {
      title: 'Forest Lane Farm',
      items: {
        Hospitals: ['Medanta – The Medicity', 'Fortis Memorial Research Institute'],
        Schools: ['The Shri Ram School, Aravali', 'The Heritage School, Gurgaon'],
        'Metro access': ['MG Road Metro Station', 'Sikandarpur Metro Station']
      }
    }
  };

  const property = properties[location.pathname.split('/').pop()];
  if (!property) return;

  const render = () => {
    if (document.querySelector('.nearby-amenities')) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'nearby-amenities.css';
    document.head.append(stylesheet);
    const headerStyles = document.createElement('link');
    headerStyles.rel = 'stylesheet';
    headerStyles.href = 'property-header.css';
    document.head.append(headerStyles);

    const cards = Object.entries(property.items).map(([label, places]) => `
      <article class="amenity-card">
        <p>${label}</p>
        <ul>${places.map(place => `<li>${place}</li>`).join('')}</ul>
      </article>`).join('');

    const section = document.createElement('section');
    section.className = 'nearby-amenities';
    section.setAttribute('aria-label', 'Nearby amenities');
    section.innerHTML = `
      <div class="amenities-intro">
        <p class="eyebrow">Location advantages</p>
        <h2>Everyday connections,<br><em>thoughtfully close.</em></h2>
        <p>Selected hospitals, schools and metro access around ${property.title}. Our advisory team can help confirm the best route for your requirements.</p>
      </div>
      <div class="amenity-grid">${cards}</div>`;
    document.querySelector('footer')?.before(section);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
