import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
  <h2>Facial Recognition Error Rates by Demographic</h2>
  <div className={styles.BarChartWrapper}></div>
  <ResponsiveContainer width="100%" height={600}>
  <BarChart
    data={data}
    margin={{
      top: 40, // more space for legend
      right: 30,
      left: 10,
      bottom: 80, // for angled labels
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="name"
      tick={{ fill: "#e0e0e0", fontSize: 10 }}
      angle={-30}
      textAnchor="end"
      interval={0}
    />
    <YAxis domain={[0, 40]} />
    <Legend verticalAlign="top" height={36} />
    <Tooltip content={<CustomTooltip />} />
    {/* <Bar dataKey="Microsoft" fill="#F14F21" label={renderCustomBarLabel} />
    <Bar dataKey="IBM" fill="#1F9CE0" label={renderCustomBarLabel} />
    <Bar dataKey="Face++" fill="#7BB411" label={renderCustomBarLabel} /> */}
    <Bar dataKey="Microsoft" fill="#F14F21"  />
    <Bar dataKey="IBM" fill="#1F9CE0"  />
    <Bar dataKey="Face++" fill="#7BB411" />
  </BarChart>
</ResponsiveContainer>


  </div>


    );
  }
}
