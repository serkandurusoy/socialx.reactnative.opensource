import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';

import {
	AccountCurrencyData,
	Header,
	HeaderButton,
	PrimaryButton,
	SocialXAccountCurrencyItem,
	SocialXAccountTitleCard,
} from '../../components';
import {ITranslatedProps} from '../../types';
import styles, {borderColor} from './SocialXAccountScreen.style';

export interface ISocialXAccountScreenViewProps extends ITranslatedProps {
	coins: number;
	contribution: number;
	returnPercentage: number;
	digitalCoins: AccountCurrencyData[];
	onSend: () => void;
	onReceive: () => void;
	onGoBack: () => void;
}

export class SocialXAccountScreenView extends Component<ISocialXAccountScreenViewProps, any> {
	public render() {
		const {coins, contribution, returnPercentage, digitalCoins, onGoBack, onReceive, onSend, getText} = this.props;

		return (
			<View style={styles.container}>
				{
					// @ts-ignore
					<Header
						title={'socialx account'}
						// @ts-ignore
						left={<HeaderButton iconName={'ios-arrow-back'} onPress={onGoBack} />}
					/>
				}
				<ScrollView
					contentContainerStyle={styles.contentContainer}
					alwaysBounceVertical={false}
					showsVerticalScrollIndicator={false}
				>
					<SocialXAccountTitleCard
						myCoins={coins}
						myContribution={contribution}
						returnPercentage={returnPercentage}
						getText={getText}
					/>
					<Text style={styles.accountTitle}>{getText('socialx.account.screen.account')}</Text>
					{digitalCoins.map((coin, index) => (
						<SocialXAccountCurrencyItem key={index} {...coin} />
					))}
					<View style={styles.bottomContainer}>
						<View style={styles.buttonContainer}>
							{
								// @ts-ignore
								<PrimaryButton label={getText('button.SEND')} borderColor={borderColor} onPress={onSend} />
							}
						</View>
						<View style={styles.buttonContainer}>
							{
								// @ts-ignore
								<PrimaryButton label={getText('button.RECEIVE')} borderColor={borderColor} onPress={onReceive} />
							}
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
