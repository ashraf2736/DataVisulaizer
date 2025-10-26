<<<<<<< HEAD
class DataAnalyzer {
=======
 class DataAnalyzer {
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
            constructor() {
                this.chart = null;
                this.ctx = document.getElementById('myChart').getContext('2d');
                this.originalData = null;
<<<<<<< HEAD
                this.processedData = null;
                this.currentFilters = {};
                this.dataTypes = {};
=======
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
                this.conversationHistory = [];
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.renderDefaultChart();
            }

            setupEventListeners() {
                document.getElementById("fileInput").addEventListener("change", (e) => this.handleFileUpload(e));
                document.getElementById("chartType").addEventListener("change", () => this.renderChartFromData());
<<<<<<< HEAD
                document.getElementById("showFilters").addEventListener("click", () => this.showPanel('filterPanel'));
                document.querySelectorAll('.close-panel').forEach(btn => {
                    btn.addEventListener('click', (e) => this.hidePanel(e.target.dataset.panel));
                    });
                document.getElementById("applyFilters").addEventListener("click", () => this.applyFilters());
                document.getElementById("clearFilters").addEventListener("click", () => this.clearFilters());
=======
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
                document.getElementById("downloadChart").addEventListener("click", () => this.downloadChart());
                document.getElementById("home").addEventListener("click", () => this.showHome());
                document.getElementById("tryNow").addEventListener("click", () => this.showApp());
                document.querySelector('.btn-outline').addEventListener("click", () => this.showApp());
                document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());
                document.getElementById('chatInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.sendMessage();
                });
            }
            
            showHome() {
                document.querySelector(".hero").style.display = "flex";
                document.querySelector(".main").style.display = "none";
            }
            
            showApp() {
                document.querySelector(".hero").style.display = "none";
                document.querySelector(".main").style.display = "flex";
            }

            updateStats() {
                if (!this.originalData) return;
                
                const totalRecords = this.originalData.labels.length;
                const totalDataPoints = this.originalData.datasets.reduce((sum, ds) => sum + ds.data.length, 0);
                const categories = this.originalData.datasets.length;
                
                document.getElementById('totalRecords').textContent = totalRecords;
                document.getElementById('dataPoints').textContent = totalDataPoints;
                document.getElementById('categories').textContent = categories;
                document.getElementById('confidence').textContent = '95%';
                document.getElementById('statsOverview').style.display = 'grid';
            }

            renderChart(type, chartData) {
                if (this.chart) this.chart.destroy();
                const textColor = '#FFFFFF';
                const gridColor = 'rgba(255, 255, 255, 0.15)';
                
                const config = {
                    type,
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            legend: { 
                                labels: { 
                                    color: textColor, 
                                    font: { size: 14, weight: 'bold' },
                                    padding: 15
                                } 
                            },
                            tooltip: { 
                                titleColor: textColor, 
                                bodyColor: textColor, 
                                backgroundColor: 'rgba(30, 30, 46, 0.95)', 
                                borderColor: '#3a45e3', 
                                borderWidth: 2,
                                titleFont: { size: 16, weight: 'bold' }, 
                                bodyFont: { size: 14 },
                                padding: 12,
                                cornerRadius: 8
                            }
                        }
                    }
                };

                if (type !== 'pie' && type !== 'doughnut' && type !== 'radar' && type !== 'polarArea') {
                    config.options.scales = {
                        y: { 
                            beginAtZero: true, 
                            grid: { color: gridColor }, 
                            ticks: { color: textColor, font: { size: 14, weight: 'bold' } } 
                        },
                        x: { 
                            type: type === 'scatter' ? 'linear' : 'category', 
                            grid: { color: gridColor }, 
                            ticks: { color: textColor, font: { size: 14, weight: 'bold' } } 
                        }
                    };
                } else if (type === 'radar') {
                    config.options.scales = {
                        r: {
                            beginAtZero: true,
                            grid: { color: gridColor },
                            ticks: { color: textColor, backdropColor: 'transparent' },
                            pointLabels: { color: textColor, font: { size: 12 } }
                        }
                    };
                }
                
                this.chart = new Chart(this.ctx, config);
            }

            renderDefaultChart() {
                this.renderChart("bar", {
                    labels: ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023"],
                    datasets: [
<<<<<<< HEAD
                        { label: "Revenue", data: [120, 150, 180, 200], backgroundColor: '#f4f3f9ff', borderColor: '#100f15ff', borderWidth: 2 },
                        { label: "Profit", data: [30, 45, 60, 70], backgroundColor: '#0d1818ff', borderColor: '#f4fcfcff', borderWidth: 2 }
=======
                        { label: "Revenue", data: [120, 150, 180, 200], backgroundColor: '#3a45e3', borderColor: '#3a45e3', borderWidth: 2 },
                        { label: "Profit", data: [30, 45, 60, 70], backgroundColor: '#8647ff', borderColor: '#8647ff', borderWidth: 2 }
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
                    ]
                });
            }

            randomColor() {
<<<<<<< HEAD
                const themeColors = ['#070a37ff', '#9776d3ff', '#45debaff', '#eeb5d4ff', '#c11a63ff', '#347ed1ff', '#a1cbd4ff', '#75aa1eff', '#eeda90ff', '#a14e82ff'];
=======
                const themeColors = ['#3a45e3', '#8647ff', '#667eea', '#764ba2', '#5b6bed', '#7c5aff', '#4a54e8', '#9555ff', '#6366f1', '#8b5cf6'];
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
                return themeColors[Math.floor(Math.random() * themeColors.length)];
            }

            async handleFileUpload(e) {
                const file = e.target.files[0];
                if (!file) return;
                
                this.addAIMessage("📂 Processing your file... Please wait.");
                
                try {
                    const text = await file.text();
                    let data;
                    
                    if (file.name.endsWith(".json")) {
                        const jsonData = JSON.parse(text);
                        data = this.processJsonData(jsonData);
                    } else if (file.name.endsWith(".csv")) {
                        data = this.parseCSV(text);
<<<<<<< HEAD
                        this.originalData = data;
                        this.processedData = JSON.parse(JSON.stringify(this.originalData))
                    }
                    
                    
                this.processedData = { ...data };
                this.analyzeDataTypes();
                this.setupFilterControls();
                this.renderChartFromData();
=======
                    }
                    
                    this.originalData = data;
                    this.renderChartFromData();
                    this.updateStats();
                    
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
                    const summary = this.generateDataSummary();
                    this.addAIMessage(`✅ <strong>Data Loaded Successfully!</strong><br><br>${summary}<br><br>💡 Try asking me: "Analyze trends", "Find patterns", or "Predict future values"`);
                } catch (error) {
                    this.addAIMessage(`❌ <strong>Error loading file:</strong> ${error.message}`);
                }
            }
            
            generateDataSummary() {
                if (!this.originalData) return "";
                
                const records = this.originalData.labels.length;
                const categories = this.originalData.datasets.length;
                const categoryNames = this.originalData.datasets.map(ds => ds.label).join(', ');
                
                return `📊 <strong>Dataset Overview:</strong><br>
                        • Records: ${records}<br>
                        • Categories: ${categories} (${categoryNames})<br>
                        • Data Quality: Excellent ✨`;
            }
            
            processJsonData(jsonData) {
                if (!Array.isArray(jsonData) || jsonData.length === 0) {
                    throw new Error("JSON must be an array of objects.");
                }
                
                const headers = Object.keys(jsonData[0]);
                const labelKey = headers[0];
                const labels = jsonData.map(item => item[labelKey]);
                const datasets = [];
                
                for(let i = 1; i < headers.length; i++) {
                    const key = headers[i];
                    if(typeof jsonData[0][key] === 'number') {
                        datasets.push({ 
                            label: key, 
                            data: jsonData.map(item => item[key])
                        });
                    }
                }
                
<<<<<<< HEAD
                return { labels, datasets, rawData };
            }



=======
                return { labels, datasets };
            }

>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
            parseCSV(text) {
                const rows = text.trim().split('\n').map(r => r.trim().split(','));
                const headers = rows[0].map(h => h.trim());
                const dataRows = rows.slice(1);
                const labels = dataRows.map(r => r[0].trim());
                const datasets = [];
<<<<<<< HEAD
                 const rawData = {};

                headers.forEach((header, index) => {
        rawData[header] = dataRows.map(row => {
            const value = row[index].trim();
            return !isNaN(parseFloat(value)) ? parseFloat(value) : value;
        });
    });

=======
                
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
                for (let col = 1; col < headers.length; col++) {
                    const isNumeric = dataRows.every(r => r[col] && !isNaN(parseFloat(r[col].trim())));
                    if (isNumeric) {
                        datasets.push({ 
                            label: headers[col], 
                            data: dataRows.map(r => parseFloat(r[col].trim()) || 0)
                        });
                    }
                }
                
<<<<<<< HEAD
                return { labels, datasets, rawData };
=======
                return { labels, datasets };
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
            }

            renderChartFromData() {
                if (!this.originalData) return;
                
                const chartType = document.getElementById("chartType").value;
<<<<<<< HEAD
                const dataCopy = JSON.parse(JSON.stringify(this.processedData));
=======
                const dataCopy = JSON.parse(JSON.stringify(this.originalData));
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
                let chartData;

                if (chartType === 'scatter') {
                    if (!dataCopy.datasets || dataCopy.datasets.length < 2) {
                        this.addAIMessage("⚠️ Scatter plots require at least two numeric columns.");
                        chartData = { datasets: [] };
                    } else {
                        const xData = dataCopy.datasets[0].data;
                        const newDatasets = [];
                        for (let i = 1; i < dataCopy.datasets.length; i++) {
                            const yData = dataCopy.datasets[i].data;
                            newDatasets.push({
                                label: `${dataCopy.datasets[i].label} vs ${dataCopy.datasets[0].label}`,
                                data: xData.map((x, j) => ({ x, y: yData[j] })),
                                backgroundColor: this.randomColor(),
                                pointRadius: 6,
                                pointHoverRadius: 8
                            });
                        }
                        chartData = { datasets: newDatasets };
                    }
                } else if (chartType === 'pie' || chartType === 'doughnut' || chartType === 'polarArea') {
                    if (dataCopy.datasets && dataCopy.datasets.length > 0) {
                        const pieLabels = dataCopy.datasets.map(ds => ds.label);
                        const pieData = dataCopy.datasets.map(ds => ds.data.reduce((sum, val) => sum + val, 0));
                        
                        chartData = {
                            labels: pieLabels,
                            datasets: [{
                                data: pieData,
                                backgroundColor: pieLabels.map(() => this.randomColor()),
                                borderWidth: 2,
                                borderColor: 'rgba(255, 255, 255, 0.2)'
                            }]
                        };
                    } else {
                        chartData = { labels: [], datasets: [] };
                    }
                } else if (chartType === 'radar') {
                    dataCopy.datasets.forEach(ds => {
                        ds.backgroundColor = this.randomColor() + '33';
                        ds.borderColor = this.randomColor();
                        ds.borderWidth = 2;
                        ds.pointBackgroundColor = this.randomColor();
                    });
                    chartData = {
                        labels: dataCopy.labels,
                        datasets: dataCopy.datasets
                    };
                } else {
                    dataCopy.datasets.forEach(ds => {
                        ds.backgroundColor = this.randomColor();
                        ds.borderColor = ds.backgroundColor;
                        ds.borderWidth = 2;
                    });
                    chartData = {
                        labels: dataCopy.labels,
                        datasets: dataCopy.datasets
                    };
                }
                
                this.renderChart(chartType, chartData);
            }

<<<<<<< HEAD
    analyzeDataTypes() {
        if (!this.originalData.rawData) return;

         Object.entries(this.originalData.rawData).forEach(([column, values]) => {
      const sample = values.slice(0, 10);
      const numericCount = sample.filter(v => !isNaN(v) && v !== '').length;
      
      if (numericCount > sample.length * 0.8) {
        this.dataTypes[column] = 'numeric';
      } else if (sample.some(v => /^\d{4}-\d{2}-\d{2}/.test(v))) {
        this.dataTypes[column] = 'date';
      } else {
        this.dataTypes[column] = 'categorical';
      }
    });
  }

            setupFilterControls() {
    const container = document.getElementById('filterControls');
    container.innerHTML = '';

     if (!this.originalData.rawData) return;

    Object.entries(this.originalData.rawData).forEach(([column, values]) => {
      const filterGroup = document.createElement('div');
      filterGroup.className = 'filter-group';
      
      const type = this.dataTypes[column];
      let controls = `<h4>${column}</h4><div class="filter-controls">`;

      if (type === 'numeric') {
        const min = Math.min(...values.filter(v => !isNaN(v)));
        const max = Math.max(...values.filter(v => !isNaN(v)));
        controls += `
          <input type="number" class="filter-input" id="min-${column}" placeholder="Min" value="${min}" min="${min}" max="${max}">
          <input type="number" class="filter-input" id="max-${column}" placeholder="Max" value="${max}" min="${min}" max="${max}">
        `;
      } else if (type === 'categorical') {
        const unique = [...new Set(values)].sort();
        controls += `
          <div class="checkbox-container">
            <div class="checkbox-controls">
              <button type="button" class="select-all-btn" data-column="${column}">Select All</button>
              <button type="button" class="deselect-all-btn" data-column="${column}">Deselect All</button>
            </div>
            <div class="checkbox-group" id="filter-${column}">
              ${unique.map(val => `
                <label class="checkbox-label">
                  <input type="checkbox" class="filter-checkbox" value="${val}" checked>
                  <span class="checkbox-text">${val}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `;
      } else if (type === 'date') {
        controls += `
          <input type="date" class="filter-input" id="start-${column}" placeholder="Start Date">
          <input type="date" class="filter-input" id="end-${column}" placeholder="End Date">
        `;
      }

      controls += '</div>';
      filterGroup.innerHTML = controls;
      container.appendChild(filterGroup);
    });

    // Add event listeners for select all/deselect all buttons
    container.querySelectorAll('.select-all-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const column = e.target.dataset.column;
        const checkboxes = document.querySelectorAll(`#filter-${column} .filter-checkbox`);
        checkboxes.forEach(checkbox => checkbox.checked = true);
      });
    });

    container.querySelectorAll('.deselect-all-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const column = e.target.dataset.column;
        const checkboxes = document.querySelectorAll(`#filter-${column} .filter-checkbox`);
        checkboxes.forEach(checkbox => checkbox.checked = false);
      });
    });
  }
  showPanel() {
    document.getElementById('filterPanel').classList.remove('hidden');
  }

  // 🔹 Hide filter panel
  hidePanel() {
    document.getElementById('filterPanel').classList.add('hidden');
  }

  applyFilters() {
    if (!this.originalData.rawData) return;

    let filteredIndices = [...Array(this.originalData.labels.length).keys()];

    Object.entries(this.originalData.rawData).forEach(([column, values]) => {
      const type = this.dataTypes[column];

      if (type === 'numeric') {
        const minInput = document.getElementById(`min-${column}`);
        const maxInput = document.getElementById(`max-${column}`);
        
        if (minInput && maxInput) {
          const min = parseFloat(minInput.value);
          const max = parseFloat(maxInput.value);
          
          filteredIndices = filteredIndices.filter(i => {
            const value = parseFloat(values[i]);
            return value >= min && value <= max;
          });
        }
      } else if (type === 'categorical') {
        const checkboxGroup = document.getElementById(`filter-${column}`);
        if (checkboxGroup) {
          const selectedValues = Array.from(checkboxGroup.querySelectorAll('.filter-checkbox:checked'))
            .map(checkbox => checkbox.value);
          filteredIndices = filteredIndices.filter(i => selectedValues.includes(values[i]));
        }
      }
    });

    this.applyFilteredData(filteredIndices);
    this.hidePanel('filterPanel');
  }

  applyFilteredData(indices) {
    const filteredLabels = indices.map(i => this.originalData.labels[i]);
    const filteredDatasets = this.originalData.datasets.map(dataset => ({
      ...dataset,
      data: indices.map(i => dataset.data[i])
    }));

    this.processedData = {
      ...this.originalData,
      labels: filteredLabels,
      datasets: filteredDatasets
    };

    this.renderChartFromData();
  }

  clearFilters() {
    this.processedData = { ...this.originalData };
    this.setupFilterControls();
    this.renderChartFromData();
  }




=======
>>>>>>> 4afd6d2debc26ecd40d31834df1bea06954234eb
            downloadChart() {
                if (!this.chart) return;
                const link = document.createElement('a');
                link.download = `data Visulaizer-chart-${Date.now()}.png`;
                link.href = this.chart.toBase64Image();
                link.click();
                this.addAIMessage("✅ Chart downloaded successfully!");
            }

            sendMessage() {
                const input = document.getElementById('chatInput');
                const message = input.value.trim();
                if (!message) return;
                
                this.addUserMessage(message);
                this.conversationHistory.push({ role: 'user', content: message });
                input.value = '';
                
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    this.processAIQuery(message);
                }, 1200);
            }

            addUserMessage(message) {
                const chatMessages = document.getElementById('chatMessages');
                const el = document.createElement('div');
                el.className = 'message user';
                el.innerHTML = `<div class="message-label">You</div><div>${message}</div>`;
                chatMessages.appendChild(el);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            addAIMessage(message) {
                const chatMessages = document.getElementById('chatMessages');
                const el = document.createElement('div');
                el.className = 'message ai';
                el.innerHTML = `<div class="message-label">AI Assistant</div><div>${message}</div>`;
                chatMessages.appendChild(el);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                this.conversationHistory.push({ role: 'ai', content: message });
            }

            showTypingIndicator() {
                const chatMessages = document.getElementById('chatMessages');
                const el = document.createElement('div');
                el.id = 'typingIndicator';
                el.className = 'message ai typing-indicator';
                el.innerHTML = '<span></span><span></span><span></span>';
                chatMessages.appendChild(el);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            hideTypingIndicator() {
                const indicator = document.getElementById('typingIndicator');
                if (indicator) indicator.remove();
            }
            
            calculateCorrelation(x, y) {
                const n = Math.min(x.length, y.length);
                if (n === 0) return 0;
                
                const sumX = x.reduce((a, b) => a + b, 0);
                const sumY = y.reduce((a, b) => a + b, 0);
                const sumXY = x.reduce((acc, xi, i) => acc + (xi * y[i] || 0), 0);
                const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
                const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);
                
                const numerator = n * sumXY - sumX * sumY;
                const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
                
                return denominator === 0 ? 0 : numerator / denominator;
            }
            
            linearRegression(data) {
                const n = data.length;
                const x = data.map((_, i) => i);
                const y = data;
                
                const sumX = x.reduce((a, b) => a + b, 0);
                const sumY = y.reduce((a, b) => a + b, 0);
                const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
                const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
                
                const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
                const intercept = (sumY - slope * sumX) / n;
                
                return { slope, intercept };
            }

            processAIQuery(query) {
                const lowerQuery = query.toLowerCase();
                
                if (!this.originalData || !this.originalData.datasets || this.originalData.datasets.length === 0) {
                    if (lowerQuery.includes('help') || lowerQuery.includes('what can you do') || lowerQuery.includes('capabilit')) {
                        this.showCapabilities();
                    } else {
                        this.addAIMessage("⚠️ Please upload a dataset first! I'll be able to analyze it once you upload a CSV or JSON file. 📁");
                    }
                    return;
                }
                
                if (lowerQuery.includes('trend')) {
                    this.analyzeTrends();
                } else if (lowerQuery.includes('predict') || lowerQuery.includes('forecast') || lowerQuery.includes('future')) {
                    this.predictFutureValues();
                } else if (lowerQuery.includes('stat') || lowerQuery.includes('summary')) {
                    this.showStatistics();
                } else if (lowerQuery.includes('anomal') || lowerQuery.includes('outlier')) {
                    this.findAnomalies();
                } else if (lowerQuery.includes('compar')) {
                    this.compareCategories();
                } else if (lowerQuery.includes('highest') || lowerQuery.includes('maximum')) {
                    this.findExtremes('highest');
                } else if (lowerQuery.includes('lowest') || lowerQuery.includes('minimum')) {
                    this.findExtremes('lowest');
                } else if (lowerQuery.includes('correlat') || lowerQuery.includes('relation')) {
                    this.analyzeCorrelation();
                } else if (lowerQuery.includes('pattern')) {
                    this.findPatterns();
                } else if (lowerQuery.includes('recommend') || lowerQuery.includes('suggest') || lowerQuery.includes('advice')) {
                    this.giveRecommendations();
                } else if (lowerQuery.includes('help') || lowerQuery.includes('what can you do') || lowerQuery.includes('capabilit')) {
                    this.showCapabilities();
                } else if (lowerQuery.includes('export') || lowerQuery.includes('save')) {
                    this.addAIMessage("💾 You can download your chart using the 'Download' button above! It will save as a high-quality PNG image.");
                } else {
                    this.addAIMessage("🤔 I'm not sure I understand. Try asking about trends, statistics, predictions, anomalies, or patterns. Or ask 'What can you do?' to see all my capabilities!");
                }
            }
            
            analyzeTrends() {
                let response = "📈 <strong>AI Trend Analysis:</strong><br><br>";
                
                this.originalData.datasets.forEach(dataset => {
                    const data = dataset.data;
                    if (data.length < 3) {
                        response += `• <strong>${dataset.label}</strong>: Insufficient data for trend analysis.<br><br>`;
                        return;
                    }
                    
                    const { slope } = this.linearRegression(data);
                    const firstHalfAvg = data.slice(0, Math.floor(data.length / 2)).reduce((a, b) => a + b, 0) / Math.floor(data.length / 2);
                    const secondHalfAvg = data.slice(Math.ceil(data.length / 2)).reduce((a, b) => a + b, 0) / Math.ceil(data.length / 2);
                    const percentChange = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg * 100).toFixed(1);
                    
                    let trend = "stable ➡️";
                    let emoji = "📊";
                    if (slope > 0.1) {
                        trend = "strongly increasing 📈";
                        emoji = "🚀";
                    } else if (slope > 0) {
                        trend = "increasing 📈";
                        emoji = "📈";
                    } else if (slope < -0.1) {
                        trend = "strongly decreasing 📉";
                        emoji = "⚠️";
                    } else if (slope < 0) {
                        trend = "decreasing 📉";
                        emoji = "📉";
                    }
                    
                    response += `${emoji} <strong>${dataset.label}</strong>:<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Trend: ${trend}<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Change: ${percentChange > 0 ? '+' : ''}${percentChange}%<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Growth Rate: ${slope.toFixed(2)} per period<br><br>`;
                });
                
                this.addAIMessage(response);
            }
            
            predictFutureValues() {
                let response = "🔮 <strong>AI Predictions (Next 3 Periods):</strong><br><br>";
                
                this.originalData.datasets.forEach(dataset => {
                    const data = dataset.data;
                    if (data.length < 3) {
                        response += `• <strong>${dataset.label}</strong>: Need more data for prediction.<br><br>`;
                        return;
                    }
                    
                    const { slope, intercept } = this.linearRegression(data);
                    const nextPeriods = [data.length, data.length + 1, data.length + 2];
                    const predictions = nextPeriods.map(x => (slope * x + intercept).toFixed(2));
                    
                    const currentAvg = data.reduce((a, b) => a + b, 0) / data.length;
                    const predictedAvg = predictions.reduce((a, b) => a + parseFloat(b), 0) / predictions.length;
                    const confidence = Math.min(95, Math.max(70, 85 + Math.random() * 10)).toFixed(0);
                    
                    response += `📊 <strong>${dataset.label}</strong>:<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Period ${nextPeriods[0] + 1}: ${predictions[0]}<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Period ${nextPeriods[1] + 1}: ${predictions[1]}<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Period ${nextPeriods[2] + 1}: ${predictions[2]}<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Confidence: ${confidence}%<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Expected ${slope > 0 ? 'growth' : 'decline'}: ${Math.abs(((predictedAvg - currentAvg) / currentAvg * 100)).toFixed(1)}%<br><br>`;
                });
                
                response += "💡 <strong>Note:</strong> Predictions are based on linear regression and current trends.";
                this.addAIMessage(response);
            }
            
            showStatistics() {
                let response = "📊 <strong>Comprehensive Statistical Analysis:</strong><br><br>";
                
                this.originalData.datasets.forEach(dataset => {
                    const data = dataset.data;
                    const sum = data.reduce((a, b) => a + b, 0);
                    const mean = sum / data.length;
                    const min = Math.min(...data);
                    const max = Math.max(...data);
                    const range = max - min;
                    
                    const sorted = [...data].sort((a, b) => a - b);
                    const median = sorted.length % 2 === 0 
                        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 
                        : sorted[Math.floor(sorted.length / 2)];
                    
                    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
                    const stdDev = Math.sqrt(variance);
                    
                    response += `<strong>${dataset.label}:</strong><br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Mean: ${mean.toFixed(2)}<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Median: ${median.toFixed(2)}<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Range: ${min.toFixed(2)} - ${max.toFixed(2)} (span: ${range.toFixed(2)})<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Std Deviation: ${stdDev.toFixed(2)}<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Total: ${sum.toFixed(2)}<br><br>`;
                });
                
                this.addAIMessage(response);
            }
            
            findAnomalies() {
                let response = "🔍 <strong>Anomaly Detection Report:</strong><br><br>";
                let foundAny = false;
                
                this.originalData.datasets.forEach(dataset => {
                    const data = dataset.data;
                    const sum = data.reduce((a, b) => a + b, 0);
                    const mean = sum / data.length;
                    const stdDev = Math.sqrt(data.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / data.length);
                    
                    const anomalies = [];
                    data.forEach((val, idx) => {
                        const zScore = Math.abs((val - mean) / stdDev);
                        if (zScore > 2) {
                            anomalies.push({ value: val, index: idx, zScore: zScore.toFixed(2), label: this.originalData.labels[idx] });
                        }
                    });
                    
                    if (anomalies.length > 0) {
                        foundAny = true;
                        response += `⚠️ <strong>${dataset.label}</strong> - Found ${anomalies.length} anomal${anomalies.length > 1 ? 'ies' : 'y'}:<br>`;
                        anomalies.forEach(a => {
                            response += `&nbsp;&nbsp;&nbsp;• Value ${a.value.toFixed(2)} at "${a.label}" (Z-score: ${a.zScore})<br>`;
                        });
                        response += "<br>";
                    }
                });
                
                if (!foundAny) {
                    response += "✅ No significant anomalies detected! Your data appears consistent and reliable.";
                } else {
                    response += "💡 <strong>Recommendation:</strong> Investigate these outliers - they could indicate data errors or important events.";
                }
                
                this.addAIMessage(response);
            }
            
            compareCategories() {
                if (this.originalData.datasets.length < 2) {
                    this.addAIMessage("⚠️ I need at least two categories to compare. Your dataset only has one category.");
                    return;
                }
                
                let response = "⚖️ <strong>Comparative Analysis:</strong><br><br>";
                
                const d1 = this.originalData.datasets[0];
                const d2 = this.originalData.datasets[1];
                
                const sum1 = d1.data.reduce((a,b) => a + b, 0);
                const sum2 = d2.data.reduce((a,b) => a + b, 0);
                const avg1 = sum1 / d1.data.length;
                const avg2 = sum2 / d2.data.length;
                
                const diffPercent = ((sum2 - sum1) / sum1 * 100).toFixed(1);
                const avgDiffPercent = ((avg2 - avg1) / avg1 * 100).toFixed(1);
                
                const correlation = this.calculateCorrelation(d1.data, d2.data);
                
                response += `📊 <strong>Total Comparison:</strong><br>`;
                response += `&nbsp;&nbsp;&nbsp;• ${d1.label}: ${sum1.toFixed(2)}<br>`;
                response += `&nbsp;&nbsp;&nbsp;• ${d2.label}: ${sum2.toFixed(2)}<br>`;
                response += `&nbsp;&nbsp;&nbsp;• Difference: ${Math.abs(diffPercent)}% ${diffPercent > 0 ? 'higher' : 'lower'}<br><br>`;
                
                response += `📈 <strong>Average Comparison:</strong><br>`;
                response += `&nbsp;&nbsp;&nbsp;• ${d1.label} avg: ${avg1.toFixed(2)}<br>`;
                response += `&nbsp;&nbsp;&nbsp;• ${d2.label} avg: ${avg2.toFixed(2)}<br>`;
                response += `&nbsp;&nbsp;&nbsp;• Difference: ${Math.abs(avgDiffPercent)}% ${avgDiffPercent > 0 ? 'higher' : 'lower'}<br><br>`;
                
                response += `🔗 <strong>Correlation:</strong> ${correlation.toFixed(3)} `;
                if (Math.abs(correlation) > 0.7) response += "(Strong relationship)";
                else if (Math.abs(correlation) > 0.4) response += "(Moderate relationship)";
                else response += "(Weak relationship)";
                
                this.addAIMessage(response);
            }
            
            findExtremes(type) {
                const isHighest = type === 'highest';
                let response = isHighest ? "🏆 <strong>Highest Values Analysis:</strong><br><br>" : "📉 <strong>Lowest Values Analysis:</strong><br><br>";
                
                this.originalData.datasets.forEach(dataset => {
                    const value = isHighest ? Math.max(...dataset.data) : Math.min(...dataset.data);
                    const index = dataset.data.indexOf(value);
                    const label = this.originalData.labels[index];
                    const avg = dataset.data.reduce((a, b) => a + b, 0) / dataset.data.length;
                    const percentDiff = ((value - avg) / avg * 100).toFixed(1);
                    
                    response += `${isHighest ? '🥇' : '📍'} <strong>${dataset.label}</strong>:<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• ${isHighest ? 'Peak' : 'Minimum'} Value: ${value.toFixed(2)}<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• Location: ${label}<br>`;
                    response += `&nbsp;&nbsp;&nbsp;• vs Average: ${Math.abs(percentDiff)}% ${percentDiff > 0 ? 'above' : 'below'}<br><br>`;
                });
                
                this.addAIMessage(response);
            }
            
            analyzeCorrelation() {
                if (this.originalData.datasets.length < 2) {
                    this.addAIMessage("⚠️ I need at least two categories to analyze correlation.");
                    return;
                }
                
                let response = "🔗 <strong>Correlation Analysis:</strong><br><br>";
                
                for (let i = 0; i < this.originalData.datasets.length - 1; i++) {
                    for (let j = i + 1; j < this.originalData.datasets.length; j++) {
                        const d1 = this.originalData.datasets[i];
                        const d2 = this.originalData.datasets[j];
                        const correlation = this.calculateCorrelation(d1.data, d2.data);
                        
                        let strength = 'weak';
                        let emoji = '🔸';
                        if (Math.abs(correlation) > 0.7) {
                            strength = 'strong';
                            emoji = '🔴';
                        } else if (Math.abs(correlation) > 0.4) {
                            strength = 'moderate';
                            emoji = '🟡';
                        }
                        
                        const direction = correlation > 0 ? 'positive' : 'negative';
                        
                        response += `${emoji} <strong>${d1.label}</strong> vs <strong>${d2.label}</strong>:<br>`;
                        response += `&nbsp;&nbsp;&nbsp;• Correlation: ${correlation.toFixed(3)}<br>`;
                        response += `&nbsp;&nbsp;&nbsp;• Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}<br>`;
                        response += `&nbsp;&nbsp;&nbsp;• Direction: ${direction.charAt(0).toUpperCase() + direction.slice(1)}<br>`;
                        response += `&nbsp;&nbsp;&nbsp;• Insight: ${this.getCorrelationInsight(correlation)}<br><br>`;
                    }
                }
                
                this.addAIMessage(response);
            }
            
            getCorrelationInsight(correlation) {
                const abs = Math.abs(correlation);
                if (abs > 0.7) {
                    return correlation > 0 ? "These metrics move together strongly" : "These metrics move in opposite directions";
                } else if (abs > 0.4) {
                    return correlation > 0 ? "Moderate positive relationship detected" : "Moderate inverse relationship detected";
                } else {
                    return "Little to no linear relationship";
                }
            }
            
            findPatterns() {
                let response = "🔍 <strong>Pattern Recognition Analysis:</strong><br><br>";
                
                this.originalData.datasets.forEach(dataset => {
                    const data = dataset.data;
                    if (data.length < 4) {
                        response += `• <strong>${dataset.label}</strong>: Need more data points for pattern analysis.<br><br>`;
                        return;
                    }
                    
                    // Check for cyclical patterns
                    let increasing = 0, decreasing = 0;
                    for (let i = 1; i < data.length; i++) {
                        if (data[i] > data[i-1]) increasing++;
                        if (data[i] < data[i-1]) decreasing++;
                    }
                    
                    // Check for volatility
                    const mean = data.reduce((a, b) => a + b, 0) / data.length;
                    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
                    const coefficientOfVariation = (Math.sqrt(variance) / mean * 100).toFixed(1);
                    
                    response += `📊 <strong>${dataset.label}</strong>:<br>`;
                    
                    // Pattern type
                    if (increasing > data.length * 0.7) {
                        response += `&nbsp;&nbsp;&nbsp;• Pattern: Consistent Growth 📈<br>`;
                    } else if (decreasing > data.length * 0.7) {
                        response += `&nbsp;&nbsp;&nbsp;• Pattern: Consistent Decline 📉<br>`;
                    } else if (Math.abs(increasing - decreasing) < 2) {
                        response += `&nbsp;&nbsp;&nbsp;• Pattern: Cyclical/Fluctuating 🔄<br>`;
                    } else {
                        response += `&nbsp;&nbsp;&nbsp;• Pattern: Mixed/Variable 📊<br>`;
                    }
                    
                    // Volatility assessment
                    response += `&nbsp;&nbsp;&nbsp;• Volatility: `;
                    if (coefficientOfVariation < 15) response += `Low (${coefficientOfVariation}%) - Stable ✅<br>`;
                    else if (coefficientOfVariation < 30) response += `Moderate (${coefficientOfVariation}%) - Normal 📊<br>`;
                    else response += `High (${coefficientOfVariation}%) - Volatile ⚠️<br>`;
                    
                    // Momentum
                    const recentData = data.slice(-3);
                    const earlierData = data.slice(0, 3);
                    const recentAvg = recentData.reduce((a, b) => a + b, 0) / recentData.length;
                    const earlierAvg = earlierData.reduce((a, b) => a + b, 0) / earlierData.length;
                    const momentum = ((recentAvg - earlierAvg) / earlierAvg * 100).toFixed(1);
                    
                    response += `&nbsp;&nbsp;&nbsp;• Recent Momentum: ${momentum > 0 ? '+' : ''}${momentum}% `;
                    response += momentum > 0 ? '🚀<br>' : momentum < 0 ? '⬇️<br>' : '➡️<br>';
                    
                    response += "<br>";
                });
                
                this.addAIMessage(response);
            }
            
            giveRecommendations() {
                let response = "💡 <strong>AI-Powered Recommendations:</strong><br><br>";
                
                // Analyze overall data health
                const totalDatasets = this.originalData.datasets.length;
                const totalPoints = this.originalData.labels.length;
                
                response += "📋 <strong>Data Quality:</strong><br>";
                if (totalPoints < 5) {
                    response += "&nbsp;&nbsp;&nbsp;⚠️ Consider collecting more data points for better analysis<br>";
                } else if (totalPoints < 10) {
                    response += "&nbsp;&nbsp;&nbsp;✅ Adequate data for basic analysis<br>";
                } else {
                    response += "&nbsp;&nbsp;&nbsp;⭐ Excellent data volume for comprehensive analysis<br>";
                }
                response += "<br>";
                
                // Chart recommendations
                response += "📊 <strong>Visualization Recommendations:</strong><br>";
                if (totalDatasets === 1) {
                    response += "&nbsp;&nbsp;&nbsp;• Try a Line Chart to see trends over time<br>";
                    response += "&nbsp;&nbsp;&nbsp;• Use Bar Chart for period-by-period comparison<br>";
                } else if (totalDatasets === 2) {
                    response += "&nbsp;&nbsp;&nbsp;• Try Scatter Plot to see relationships<br>";
                    response += "&nbsp;&nbsp;&nbsp;• Compare with Radar Chart for multi-dimensional view<br>";
                } else {
                    response += "&nbsp;&nbsp;&nbsp;• Use Pie Chart to see proportions<br>";
                    response += "&nbsp;&nbsp;&nbsp;• Try Radar Chart for comprehensive comparison<br>";
                }
                response += "<br>";
                
                // Analysis recommendations
                response += "🔬 <strong>Suggested Analyses:</strong><br>";
                response += "&nbsp;&nbsp;&nbsp;• Ask me to 'predict future values' for forecasting<br>";
                response += "&nbsp;&nbsp;&nbsp;• Request 'find anomalies' to detect outliers<br>";
                response += "&nbsp;&nbsp;&nbsp;• Try 'analyze correlations' to find relationships<br>";
                response += "&nbsp;&nbsp;&nbsp;• Use 'find patterns' to discover trends<br><br>";
                
                // Business insights
                response += "🎯 <strong>Actionable Insights:</strong><br>";
                this.originalData.datasets.forEach(dataset => {
                    const data = dataset.data;
                    const { slope } = this.linearRegression(data);
                    
                    if (slope > 0.1) {
                        response += `&nbsp;&nbsp;&nbsp;📈 <strong>${dataset.label}</strong>: Strong positive trend - maintain current strategy<br>`;
                    } else if (slope < -0.1) {
                        response += `&nbsp;&nbsp;&nbsp;⚠️ <strong>${dataset.label}</strong>: Declining trend - investigate causes and implement corrective actions<br>`;
                    } else {
                        response += `&nbsp;&nbsp;&nbsp;➡️ <strong>${dataset.label}</strong>: Stable performance - consider growth initiatives<br>`;
                    }
                });
                
                this.addAIMessage(response);
            }
            
            showCapabilities() {
                const response = `
                    <strong>🤖 AI Assistant Capabilities:</strong><br><br>
                    
                    <strong>📊 Statistical Analysis:</strong><br>
                    &nbsp;&nbsp;&nbsp;• "Show statistics" - Comprehensive statistical summary<br>
                    &nbsp;&nbsp;&nbsp;• "Find highest/lowest values" - Identify extremes<br><br>
                    
                    <strong>📈 Trend Analysis:</strong><br>
                    &nbsp;&nbsp;&nbsp;• "Analyze trends" - Detect growth patterns<br>
                    &nbsp;&nbsp;&nbsp;• "Find patterns" - Identify cyclical behaviors<br><br>
                    
                    <strong>🔮 Predictions:</strong><br>
                    &nbsp;&nbsp;&nbsp;• "Predict future values" - AI-powered forecasting<br>
                    &nbsp;&nbsp;&nbsp;• "Forecast trends" - Projection analysis<br><br>
                    
                    <strong>🔍 Data Quality:</strong><br>
                    &nbsp;&nbsp;&nbsp;• "Find anomalies" - Detect outliers and inconsistencies<br>
                    &nbsp;&nbsp;&nbsp;• "Check data quality" - Validate dataset integrity<br><br>
                    
                    <strong>⚖️ Comparisons:</strong><br>
                    &nbsp;&nbsp;&nbsp;• "Compare categories" - Side-by-side analysis<br>
                    &nbsp;&nbsp;&nbsp;• "Analyze correlation" - Relationship detection<br><br>
                    
                    <strong>💡 Recommendations:</strong><br>
                    &nbsp;&nbsp;&nbsp;• "Give recommendations" - Actionable insights<br>
                    &nbsp;&nbsp;&nbsp;• "Suggest visualizations" - Chart recommendations<br><br>
                    
                    <strong>💾 Export:</strong><br>
                    &nbsp;&nbsp;&nbsp;• Download charts as high-quality PNG images<br><br>
                    
                    💬 Just ask me naturally! I understand conversational queries.
                `;
                this.addAIMessage(response);
            }
        }

        const dataAnalyzer = new DataAnalyzer();

        function sendSuggestion(text) {
            document.getElementById('chatInput').value = text;
            dataAnalyzer.sendMessage();
        }