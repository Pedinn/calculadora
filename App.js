import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-dev';
import Button from './src/componets/Button'
import Display from './src/componets/Display'

const initialState = {
  displayValue: '0',  // display começa com 0
  clearMemory: false, // vai dizer se o display precisar ser limpo no proximo digito ou se nao precisa ser limpo (false = display nao vai ser limpo quando clicar no novo digito) - (true = quando clicar num novo digito o display vai ser limpo)
  operation: null,    // variavel que armazena o tipo de operação foi setada ( +, -, *, /, =)
  values: [0, 0],     // array de valores com indice 0 e indice 1
  current: 0,         // setando o indice 0 ou indice 1
}

export default function App() {
  state = { ...initialState } // state vai usar o initialState que vai pegar todos os atributos acima e setar dentro do objeto que representa o estado 

  addDigit = n => {

    const clearDisplay = this.state.displayValue === '0' // se o display estiver = '0' ira subtituir pelo numero clicado 
      || this.state.clearDisplay

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0 // sempre que setar uma nova operação o valor do indice [1] sera zerado, para ficar pronto para um novo valor
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Display value={this.state.displayValue} />
      <View style={styles.button}>
        <Button label='AC' triple onClick={this.clearMemory} />
        <Button label='/' operation onClick={this.setOperation} />
        <Button label='7' onClick={this.addDigit} />
        <Button label='8' onClick={this.addDigit} />
        <Button label='9' onClick={this.addDigit} />
        <Button label='*' operation onClick={this.setOperation} />
        <Button label='4' onClick={this.addDigit} />
        <Button label='5' onClick={this.addDigit} />
        <Button label='6' onClick={this.addDigit} />
        <Button label='-' operation onClick={this.setOperation} />
        <Button label='1' onClick={this.addDigit} />
        <Button label='2' onClick={this.addDigit} />
        <Button label='3' onClick={this.addDigit} />
        <Button label='+' operation onClick={this.setOperation} />
        <Button label='0' double onClick={this.addDigit} />
        <Button label='.' onClick={this.addDigit} />
        <Button label='=' operation onClick={this.setOperation} />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
