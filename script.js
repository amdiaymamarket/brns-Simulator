const resourceConfig = [
  { name: 'Eau', stock: 90, demand: 58, price: 16 },
  { name: 'Terre', stock: 74, demand: 63, price: 21 },
  { name: 'Forêts', stock: 68, demand: 52, price: 18 },
  { name: 'Pêche', stock: 60, demand: 45, price: 25 },
  { name: 'Minerais', stock: 58, demand: 61, price: 30 },
];

const state = {
  day: 1,
  transactions: 0,
  budget: 4.8,
  totalVolume: 0,
};

const resourceCardsEl = document.getElementById('resourceCards');
const dayCountEl = document.getElementById('dayCount');
const marketIndexEl = document.getElementById('marketIndex');
const ecoScoreEl = document.getElementById('ecoScore');
const transactionsEl = document.getElementById('transactions');
const budgetEl = document.getElementById('budget');
const totalVolumeEl = document.getElementById('totalVolume');
const nextCycleBtn = document.getElementById('nextCycleBtn');
const resetBtn = document.getElementById('resetBtn');

function renderResources() {
  resourceCardsEl.innerHTML = resourceConfig
    .map((resource) => {
      const supplyLevel = Math.min(100, Math.max(20, resource.stock));
      const priceChange = Math.max(10, resource.price + Math.round((resource.demand - resource.stock) / 10));

      return `
        <article class="resource-card">
          <div class="resource-header">
            <span class="resource-name">${resource.name}</span>
            <span class="badge">${resource.stock}% stock</span>
          </div>
          <div class="metric"><span>Prix</span><strong>${priceChange} XOF</strong></div>
          <div class="metric"><span>Demande</span><strong>${resource.demand}%</strong></div>
          <div class="metric"><span>Disponibilité</span><strong>${supplyLevel}%</strong></div>
          <div class="progress">
            <div class="progress-bar" style="width:${supplyLevel}%"></div>
          </div>
        </article>
      `;
    })
    .join('');
}

function computeMarketIndex() {
  const averageStock = resourceConfig.reduce((sum, item) => sum + item.stock, 0) / resourceConfig.length;
  const averageDemand = resourceConfig.reduce((sum, item) => sum + item.demand, 0) / resourceConfig.length;
  const value = Math.round((averageDemand * 0.7 + averageStock * 0.3) * 1.1);
  return Math.min(100, value);
}

function computeEcoScore() {
  const weakResources = resourceConfig.filter((item) => item.stock < 50).length;
  return Math.max(55, 100 - weakResources * 8);
}

function updateSummary() {
  const marketIndex = computeMarketIndex();
  const ecoScore = computeEcoScore();

  dayCountEl.textContent = state.day;
  marketIndexEl.textContent = marketIndex;
  ecoScoreEl.textContent = `${ecoScore}%`;
  transactionsEl.textContent = state.transactions;
  budgetEl.textContent = `${state.budget.toFixed(1)}M XOF`;
  totalVolumeEl.textContent = `${state.totalVolume}k`;
}

function nextCycle() {
  state.day += 1;
  state.transactions += 1 + Math.floor(Math.random() * 4);
  state.budget += 0.3 + Math.random() * 0.7;
  state.totalVolume += 12 + Math.floor(Math.random() * 25);

  resourceConfig.forEach((resource) => {
    const volatility = Math.random() * 18 - 9;
    const demandShift = Math.random() * 16 - 8;

    resource.stock = Math.min(100, Math.max(20, resource.stock + volatility));
    resource.demand = Math.min(100, Math.max(20, resource.demand + demandShift));
    resource.price = Math.max(10, Math.round(resource.price + volatility * 0.35));
  });

  renderResources();
  updateSummary();
}

function resetSimulation() {
  state.day = 1;
  state.transactions = 0;
  state.budget = 4.8;
  state.totalVolume = 0;

  resourceConfig[0].stock = 90;
  resourceConfig[0].demand = 58;
  resourceConfig[0].price = 16;

  resourceConfig[1].stock = 74;
  resourceConfig[1].demand = 63;
  resourceConfig[1].price = 21;

  resourceConfig[2].stock = 68;
  resourceConfig[2].demand = 52;
  resourceConfig[2].price = 18;

  resourceConfig[3].stock = 60;
  resourceConfig[3].demand = 45;
  resourceConfig[3].price = 25;

  resourceConfig[4].stock = 58;
  resourceConfig[4].demand = 61;
  resourceConfig[4].price = 30;

  renderResources();
  updateSummary();
}

nextCycleBtn.addEventListener('click', nextCycle);
resetBtn.addEventListener('click', resetSimulation);

renderResources();
updateSummary();
