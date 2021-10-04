import React, { useState, useImperativeHandle } from 'react'

// https://reactjs.org/docs/forwarding-refs.html
// forwardRef => the component can access the ref passed to it
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => setVisible(!visible)

  // the ref of this component now has the toggleVisibility
  // as a method. The state of this component can be changed
  // from its parent which is not possible without refs
  useImperativeHandle(ref, () =>  {
    return {
        toggleVisibility
    }
  })
  // https://reactjs.org/docs/hooks-reference.html#useimperativehandle
  // useImperativeHandle customizes the instance value that
  // is exposed to parent components when using ref

  return (
      <div>
          <div style={hideWhenVisible}>
              <button onClick={toggleVisibility}>{props.buttonLabel}</button>
          </div>
          <div style={showWhenVisible}>
              {props.children}
              <button onClick={toggleVisibility}>Cancel</button>
          </div>
      </div>
  )
})

export default Togglable