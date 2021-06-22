import { shallowMount } from '@vue/test-utils'
import Calculator from '@/components/Calculator.vue'
describe('Calculator', () => {
  let wrapper, display, btn1, equal;
  beforeEach(()=>{
    wrapper = shallowMount(Calculator)
    display = wrapper.find('.display')
    btn1 = wrapper.find('#btn1')
    equal = wrapper.find('#equal')
  })
  it('should start with 0', async () => {
    expect(display.text()).toBe("0")
  })
  it('should shows the current number when user click to a number', async () => {
    await btn1.trigger('click')
    expect(display.text()).toBe("1")
  })
  it('should add the current number with the new number', async () => {
    wrapper.setData({current: "1"})
    await btn1.trigger('click')
    expect(display.text()).toBe("11")
  })
  it('should change the current number to a new number if operator was clicked before', async () => {
    wrapper.setData({current: "123", operatorClicked: true})
    await btn1.trigger('click')
    expect(display.text()).toBe("1")
  })
  it('should do nothing if equal operator is triggered but none operator was clicked', async () => {
    wrapper.setData({current: "123", operatorClicked: false})
    await equal.trigger('click')
    expect(display.text()).toBe("123")
  })
  it('should do the operation when a current, a previous and an operator is assigned', async () => {
    wrapper.setData({current: "1", previous: "1", operator: (a,b) => a + b})
    await equal.trigger('click')
    expect(display.text()).toBe("2")
  })
})
