import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const CustomInputNumber = ({
  min,
  max,
  step,
  value,
  name,
  disabled,
  onChange,
  onBlur,
}) => {
  const input = useRef()
  let [addId, setAddId] = useState(null)
  let [subtractId, setSubtractId] = useState(null)

  if (value <= min) {
    _stopSubtracting()
  }

  if (value >= max) {
    _stopAdding()
  }

  function _onChange(e) {
    onChange((prevState) => {
      const newState = [...prevState]
      const [index, type] = input.current.name.split('-')
      const val = +e.target.value
      newState[index][type] = val
      return newState
    })
  }

  function _keepAdding() {
    if (disabled) return
    const id = setInterval(() => {
      onChange((prevState) => {
        const newState = [...prevState]
        const [index, type] = input.current.name.split('-')
        newState[index][type] += step
        return newState
      })
    }, 80)
    setAddId(id)
  }

  function _stopAdding() {
    clearInterval(addId)
  }

  function _keepSubtracting() {
    if (disabled && value === min) return
    const id = setInterval(() => {
      onChange((prevState) => {
        const newState = [...prevState]
        const [index, type] = input.current.name.split('-')
        newState[index][type] -= step
        return newState
      })
    }, 80)
    setSubtractId(id)
  }

  function _stopSubtracting() {
    clearInterval(subtractId)
  }

  return (
    <StyledCustomInputNumber>
      <button onMouseDown={_keepSubtracting} onMouseUp={_stopSubtracting}>
        -
      </button>
      <input
        ref={input}
        type='number'
        name={name}
        value={value}
        onChange={_onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        disabled={disabled}
      />
      <button onMouseDown={_keepAdding} onMouseUp={_stopAdding}>
        +
      </button>
    </StyledCustomInputNumber>
  )
}

const StyledCustomInputNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  button,
  input {
    width: 48px;
    height: 48px;
    border-radius: 4px;
  }
  button {
    background-color: #fff;
    border: 1px solid #91bfdd;
    color: #91bfdd;
    font-size: 40px;
    line-height: 1;
    cursor: pointer;
  }
  input {
    border: 1px solid #ccc;
    color: #999;
    text-align: center;
    font-size: 20px;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`

export default CustomInputNumber
