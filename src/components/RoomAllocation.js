import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import CustomInputNumber from './CustomInputNumber';

const MIN = 0
const MAX = 8
const STEP = 1

const RoomAllocation = ({ guest, room, onChange }) => {
  const [result, setResult] = useState([])
  const [disabled, setDisabled] = useState(false)

  const unassignedGuests = useMemo(() => {
    const assignedGuests = _getAssignedGuests(result)
    return guest - assignedGuests
  }, [result])

  useEffect(() => {
    _initResult()
  }, [])

  useEffect(() => {
    onChange(result)
  }, [result])

  useEffect(() => {
    setDisabled(unassignedGuests <= 0)
  }, [unassignedGuests])

  function onBlur(e) {
    const { name, value } = e.target
    console.log({ name, value })
  }

  function _initResult() {
    for (let i = 0; i < room; i++) {
      setResult((prevState) => [...prevState, { adult: 1, child: 0 }]);
    }
  }

  function _getAssignedGuests(arr) {
    return arr.reduce((acc, cur) => acc + cur.adult + cur.child, 0)
  }

  return (
    <Container>
      <h1 className='title'>住客人數：{guest}人 / {room}房</h1>
      <h2 className='unassigned-guests'>尚未分配人數：{unassignedGuests}</h2>
      {result.map(({ adult, child }, index) => (
        <section className='room' key={index}>
          <h1 className='guest-number'>房間：{adult + child} 人</h1>
          <div className='guest-wrapper'>
            <div>
              <div className='guest-type'>大人</div>
              <div className='description'>年齡 20+</div>
            </div>
            <CustomInputNumber
              name={`${index}-adult`}
              value={result[index]['adult']}
              onChange={setResult}
              onBlur={onBlur}
              min={MIN}
              max={MAX}
              step={STEP}
              disabled={disabled}
            />
          </div>
          <div className='guest-wrapper'>
            <div className='guest-type'>小孩</div>
            <CustomInputNumber
              name={`${index}-child`}
              value={result[index]['child']}
              onChange={setResult}
              onBlur={onBlur}
              min={MIN}
              max={MAX}
              step={STEP}
              disabled={disabled}
            />
          </div>
        </section>
      ))}
    </Container>
  )
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .unassigned-guests {
    margin: 16px 0;
    padding: 16px;
    background-color: #f0f8ff;
    border: 1px solid #91bfdd;
    color: #666;
    font-size: 14px;
  }
  .room + .room {
    margin: 24px 0;
    padding-top: 24px;
    border-top: 1px solid #ddd;
  }
  .guest-number {
    font-size: 20px;
    font-weight: bold;
  }
  .guest-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0;
  }
  .description {
    font-size: 14px;
    color: #999;
  }
`

export default RoomAllocation
