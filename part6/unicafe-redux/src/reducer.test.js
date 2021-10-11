import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('good is incremented twice', () => {
    const action = {
      type: 'GOOD'
    }
    const state = {
      good: 9,
      ok: 5,
      bad: 2
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)

    deepFreeze(newState)
    const thirdState = counterReducer(newState, action)

    expect(thirdState).toEqual({
      good: 11,
      ok: 5,
      bad: 2
    })
  })

  test('zero is called', () => {
    const action = {
      type: 'ZERO'
    }

    const state = {
      good: 10,
      ok: 20,
      bad: 30
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})