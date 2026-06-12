import React from 'react';
import '../../styles/generic-page.css';

function SizeGuide() {
  return (
    <div className="generic-page">
      <h1 className="generic-page__title">Size Guide</h1>
      <div className="generic-page__content">
        <p>Finding the perfect fit is essential. Use our sizing charts below to determine your Shivora size based on your body measurements.</p>
        
        <h2>Women's Clothing (Inches)</h2>
        <div style={{ overflowX: 'auto', marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '12px' }}>Size</th>
                <th style={{ padding: '12px' }}>Bust</th>
                <th style={{ padding: '12px' }}>Waist</th>
                <th style={{ padding: '12px' }}>Hips</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>XS (0-2)</td>
                <td style={{ padding: '12px' }}>32-33</td>
                <td style={{ padding: '12px' }}>24-25</td>
                <td style={{ padding: '12px' }}>34-35</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>S (4-6)</td>
                <td style={{ padding: '12px' }}>34-35</td>
                <td style={{ padding: '12px' }}>26-27</td>
                <td style={{ padding: '12px' }}>36-37</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>M (8-10)</td>
                <td style={{ padding: '12px' }}>36-37</td>
                <td style={{ padding: '12px' }}>28-29</td>
                <td style={{ padding: '12px' }}>38-39</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>L (12-14)</td>
                <td style={{ padding: '12px' }}>38-40</td>
                <td style={{ padding: '12px' }}>30-32</td>
                <td style={{ padding: '12px' }}>40-42</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>XL (16)</td>
                <td style={{ padding: '12px' }}>41-43</td>
                <td style={{ padding: '12px' }}>33-35</td>
                <td style={{ padding: '12px' }}>43-45</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>How to Measure</h2>
        <ul>
          <li><strong>Bust:</strong> Measure under your arms, around the fullest part of your chest.</li>
          <li><strong>Waist:</strong> Measure around your natural waistline, keeping the tape a bit loose.</li>
          <li><strong>Hips:</strong> Measure around the fullest part of your body at the top of your leg.</li>
        </ul>
      </div>
    </div>
  );
}

export default SizeGuide;
