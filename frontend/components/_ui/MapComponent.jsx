import React from "react"

function MapComponent({ names, children }) {

  return names.map((name, index) => (
    <React.Fragment key={`${name}-${index}`}>
      {children(name)}
    </React.Fragment>
  ))

}

export default MapComponent