import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../../../styles/ExplainationComponents/ExplainationSections.module.css'

const data = [
  {
    name: 'Lighter-skinned men',
    Microsoft: 0,
    IBM: 0.3,
    'Face++': 0.8,
  },
  {
    name: 'Lighter-skinned women',
    Microsoft: 1.7,
    IBM: 7.1,
    'Face++': 9.8,
  },
  {
    name: 'Darker-skinned men',
    Microsoft: 6.0,
    IBM: 12.0,
    'Face++': 0.7,
  },
  {
    name: 'Darker-skinned women',
    Microsoft: 20.8,
    IBM: 34.7,
    'Face++': 34.5,
  }
];

// function changeTooltip(label) {
//     if (label == 'Lighter-skinned men') {
//         return "Hi HI HI"
//     }
//   }

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width / 2} y={y} fill="#c1c1c1" textAnchor="middle" dy={-6}>{`${value}%`}</text>;
  };

function CustomTooltip({ payload, label, active }) {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{ background: "#e0e0e0", padding: "10px", border: "1px solid #ccc", borderRadius: "10px" }}
        >
          <p className="label" style={{ fontWeight: "bold", color: "black", marginBottom: 8 }}>
            Error rates for<br />
            {label}:
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: 0 }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  }
  
  

export default class Graph extends PureComponent {
  render() {
    return (
      <div className={styles.BarChartContainerDiv}>
      <h2>
      Facial Recognition Error Rates by Demographic
    </h2>
      <ResponsiveContainer width="90%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#e0e0e0" }} />
          <YAxis domain={[0, 40]} />
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Bar dataKey="Microsoft" fill="#F14F21" activeBar={<Rectangle fill="#F14F21" stroke="#e0e0e0" />} label={renderCustomBarLabel}/>
          <Bar dataKey="IBM" fill="#1F9CE0" activeBar={<Rectangle fill="#1F9CE0" stroke="#e0e0e0" />} label={renderCustomBarLabel}/>
          <Bar dataKey="Face++" fill="#7BB411" activeBar={<Rectangle fill="#7BB411" stroke="#e0e0e0" />} label={renderCustomBarLabel} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  }
}
