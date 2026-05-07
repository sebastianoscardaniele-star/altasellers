
import { useState } from 'react'
import dataJson from './data.json'

const activationOptions = [
  'ID Site',
  'Accesos',
  'Carga de matriz',
  'Carga de catálogo',
  'Always ON',
  'Compra de Prueba',
  'Confirmación CAT',
  'Config. Plan',
  'Prestamos',
  'Prueba realizada',
  'Alta Finalizada',
  'Apagado'
]

export default function App() {
  const [data, setData] = useState(dataJson)
  const [brand, setBrand] = useState(Object.keys(dataJson)[0])
  const [selected, setSelected] = useState(0)

  const sellers = data[brand] || []
  const seller = sellers[selected] || {}

  const updateField = (field, value) => {
    const updated = { ...data }
    updated[brand][selected][field] = value
    setData(updated)
  }

  return (
    <div className="container">
      <h1>Altas Tiendas</h1>

      <div className="tabs">
        {Object.keys(data).map((b) => (
          <button
            key={b}
            className={brand === b ? 'active' : ''}
            onClick={() => {
              setBrand(b)
              setSelected(0)
            }}
          >
            {b}
          </button>
        ))}
      </div>

      <div className="layout">
        <div className="sidebar">
          <h3>Tiendas</h3>
          {sellers.map((s, idx) => (
            <div
              key={idx}
              className={selected === idx ? 'card activeCard' : 'card'}
              onClick={() => setSelected(idx)}
            >
              <strong>{s['Seller'] || s['Tienda'] || 'Registro'}</strong>
            </div>
          ))}
        </div>

        <div className="content">
          <h2>Detalle</h2>

          {Object.entries(seller).map(([key, value]) => {
            const checkFields = [
              'Alta cuenta bancaria',
              'Alta Establecimiento',
              'Alta alta de shop',
              'Carga de catalogo',
              'Alta Producteca',
              'Alta OCA',
              'Alta Módulo Logístico',
              'Alta flete propio',
              'Alta ID Site Payway',
              'Alta MODO',
              'Compra de prueba',
              'Devolución',
              'Carta acuerdo',
              'Carga de campañas',
              'Confirmación CAT'
            ]

            if (checkFields.includes(key)) {
              return (
                <div className="field" key={key}>
                  <label>{key}</label>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateField(key, e.target.checked)}
                  />
                </div>
              )
            }

            if (key === 'Establecimiento Rebranding') {
              return (
                <div className="field" key={key}>
                  <label>{key}</label>
                  <select
                    value={value}
                    onChange={(e) => updateField(key, e.target.value)}
                  >
                    <option>Si</option>
                    <option>No</option>
                  </select>
                </div>
              )
            }

            if (key === 'Activasión') {
              return (
                <div className="field" key={key}>
                  <label>{key}</label>
                  <select
                    value={value}
                    onChange={(e) => updateField(key, e.target.value)}
                  >
                    {activationOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              )
            }

            return (
              <div className="field" key={key}>
                <label>{key}</label>
                <input
                  value={value || ''}
                  onChange={(e) => updateField(key, e.target.value)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
