const baseApiUrl = 'https://data.opendevelopmentcambodia.net/en/api/3/action/datastore_search';
const limit = 1000;
let resourceUrl;

if (document.getElementById('laws-timeline') != null) {
  if (document.documentElement.lang === 'en') {
    resourceId = '68bbda74-854f-440a-adbb-1571fd162458';
  } else {
    resourceId = '38ef97b3-bd50-4c76-b0a5-21a718ccdc80';
  }

  resourceUrl = baseApiUrl + '?resource_id=' + resourceId + '&limit=' + limit;

  fetch(resourceUrl)
    .then(response => response.json())
    .then(data => createTimeline(data.result.records, 'laws-timeline'))
}

if (document.getElementById('events-timeline') != null) {
  if (document.documentElement.lang === 'en') {
    resourceId = 'f40f6193-1802-4338-9169-abacecb5d217';
  } else {
    resourceId = '53800d2e-2e92-4d5a-bd9c-759760512b0a';
  }

  resourceUrl = baseApiUrl + '?resource_id=' + resourceId + '&limit=' + limit;

  fetch(resourceUrl)
    .then(response => response.json())
    .then(data => createTimeline(data.result.records, 'events-timeline'))
}

function createTimeline(data, timelineId) {
  let timelineList = document.createElement('ul');

  data.forEach(record => {
    const timelineItem = document.createElement('li');

    let element = '';

    element += '<div class="content">';

    if (timelineId == 'laws-timeline') {
      element += `<h4>${record.title}<a title="Download" target="_blank" class="btn btn-sm btn-secondary float-right" href="${record.resource_link}"><i class="bi bi-download"></i></a></h4>`;
    } else if (timelineId == 'events-timeline') {
      element += `<h4>${record.title}</h4>`;
    }

    element += '<div class="description">';
    element += `<p class="text-center">${record.description}</p>`;

    if (record.reference_text != '') {
      element += `<p class="text-right font-weight-lighter font-italic" id="reference-text">${record.reference_text}</p>`;
    }

    if (record.reference_text_2) {
      element += `<p class="text-right font-weight-lighter font-italic" id="reference-text">${record.reference_text_2}</p>`;
    }

    element += '</div>';
    element += '</div>';
    element += '<div class="point"></div>';
    element += '<div class="date">';
    element += `<h5>${record.date}</h5>`;
    element += '</div>';
    

    timelineItem.innerHTML = element;

    timelineList.appendChild(timelineItem);
  })

  document.getElementById(timelineId).appendChild(timelineList);
}