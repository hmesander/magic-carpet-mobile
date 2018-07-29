import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Card, Text, Button, View } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { SecureStore } from 'expo';
import LandingPage from './LandingPage';
import HomeButton from './HomeButton';
import SettingSaveButton from './SettingSaveButton'

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRadius: [2,4],
      selectedPrice: [2,3],
      selectedRating: [2,4],
      goHome: false
    }

    this.handleHomeClick = this.handleHomeClick.bind(this);
  }

  handleHomeClick() {
    this.saveRadius();
    this.savePrice();
    this.saveRating();

    console.log(`Radius: ${this.state.selectedRadius}`)
    console.log(`Price: ${this.state.selectedPrice}`)
    console.log(`Rating: ${this.state.selectedRating}`)

    this.setState(() => ({
      goHome: true
    }));
  }

  saveRadius = (data) => {
    this.setState(() => ({
      selectedRadius: data
    }));
  }

  savePrice = (data) => {
    this.setState(() => ({
      selectedPrice: data
    }));
  }

  saveRating = (data) => {
    this.setState(() => ({
      selectedRating: data
    }));
  }

  render() {
    let content;
    if (!this.state.goHome) {
      content = (
        <React.Fragment>
          <HomeButton handleHomeClick={this.handleHomeClick} />
          <Card
            wrapperStyle={{ width: 300 }}>
            <Text style={styles.card_heading}>
              Settings
            </Text>
            <Text style={styles.setting}>
              Radius:  {this.state.selectedRadius[0]} - {this.state.selectedRadius[1]} Miles
            </Text>
            <MultiSlider style={styles.slider}
              values={this.state.selectedRadius}
              onValuesChange={this.saveRadius}
              onValuesChangeFinish={this.saveRadius}
              min={1}
              max={5}
              step={1}
              allowOverlap
              snapped
            />
            <Text style={styles.setting}>
                Price:  { '$'.repeat(this.state.selectedPrice[0]) } - { '$'.repeat(this.state.selectedPrice[1]) }
            </Text>
            <MultiSlider style={styles.slider}
              values={this.state.selectedPrice}
              onValuesChange={this.savePrice}
              onValuesChangeFinish={this.savePrice}
              min={1}
              max={4}
              step={1}
              allowOverlap
              snapped
            />
            <Text style={styles.setting}>
              Rating:  {this.state.selectedRating[0]} - {this.state.selectedRating[1]} Stars
            </Text>
            <MultiSlider style={styles.slider}
              values={this.state.selectedRating}
              onValuesChange={this.saveRating}
              onValuesChangeFinish={this.saveRating}
              min={1}
              max={5}
              step={1}
              allowOverlap
              snapped
            />
            <SettingSaveButton clickEvent={() => this.handleHomeClick()}/>
          </Card>
        </React.Fragment>
      )
    } else if (this.state.goHome) {
      content = <LandingPage />
    }

    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  card_heading: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },
  setting: {
    paddingStart: 5,
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5
  },
  slider: {
    marginBottom: 30,
    height: 70,
  }
});
