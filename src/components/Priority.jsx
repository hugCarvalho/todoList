import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  /* background-color: aliceblue; */
  display: flex;
  justify-content: space-between;
  width: 60px;
  height: 17px;
  padding: 1px;
  margin-right: 40px;

  @media (max-width: 780px) {
    width: 70px;
    height: 10px;
    margin-right: 10px;
  }
`

const PriorityLabel = styled.div`
  width: 16px;
  border-radius: 2px;
  cursor: pointer;
  ${({ color }) => {
    return `
      border: 1px solid ${color};
      background: ${color};
    `
  }}

  @media (max-width: 780px) {
    width: 14px;
  }
`

function PriorityTag({ priority, setPriority, taskId }) {
  const handleOnClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setPriority(taskId, e.target.id)
  }

  return (
    <Container>
      <PriorityLabel
        id='high'
        onClick={handleOnClick}
        style={{ border: '1px solid red' }}
        color={priority === 'high' ? 'red' : ''}
      />
      <PriorityLabel
        id='medium'
        onClick={handleOnClick}
        style={{ border: '1px solid orange' }}
        color={priority === 'medium' ? 'orange' : ''}
      />
      <PriorityLabel
        id='low'
        onClick={handleOnClick}
        style={{ border: '1px solid lightblue' }}
        color={priority === 'low' ? 'lightblue' : ''}
      />
    </Container>
  )
}

export default PriorityTag
