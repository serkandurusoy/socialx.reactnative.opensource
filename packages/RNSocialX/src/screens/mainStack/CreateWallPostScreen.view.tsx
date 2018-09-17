import * as React from 'react';
import {Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {ButtonSizes, MediaHorizontalScroller, PrimaryButton, SharePostInput} from '../../components';
import {OS_TYPES} from '../../environment/consts';
import {Colors, Icons, Sizes} from '../../environment/theme';
import {IResizeProps, ITranslatedProps} from '../../types';
import style from './CreateWallPostScreen.style';

interface ICreateWallPostScreenViewProps extends ITranslatedProps, IResizeProps {
	avatarImage: string | null;
	shareText: string;
	mediaObjects: string[];
	uploadProgress: number;
	onShareTextUpdate: (value: string) => void;
	onAddMedia: () => void;
	onPostSend: () => void;
}

export const CreateWallPostScreenView: React.SFC<ICreateWallPostScreenViewProps> = ({
	avatarImage,
	shareText,
	onShareTextUpdate,
	onAddMedia,
	onPostSend,
	mediaObjects,
	uploadProgress,
	getText,
	marginBottom,
}) => (
	<SafeAreaView style={[style.safeView, Platform.OS === OS_TYPES.IOS ? {paddingBottom: marginBottom} : {}]}>
		<ScrollView contentContainerStyle={style.container} keyboardShouldPersistTaps={'handled'}>
			<SharePostInput
				avatarSource={avatarImage}
				placeholder={getText('new.wall.post.screen.input.placeholder')}
				text={shareText}
				onTextUpdate={onShareTextUpdate}
			/>
			<TouchableOpacity style={style.addMediaButton} onPress={onAddMedia}>
				<Image source={Icons.iconNewPostAddMedia} style={style.photoIcon} resizeMode={'contain'} />
				<Text style={style.addMediaText}>{getText('new.wall.post.screen.attach.media.button')}</Text>
			</TouchableOpacity>
			{mediaObjects.length > 0 && (
				<View style={style.mediaContainer}>
					<MediaHorizontalScroller mediaURIs={mediaObjects} />
				</View>
			)}
			// @ts-ignore
			<PrimaryButton
				label={getText('new.wall.post.screen.send.button')}
				size={ButtonSizes.Small}
				width={Sizes.smartHorizontalScale(100)}
				onPress={onPostSend}
				borderColor={Colors.transparent}
			/>
		</ScrollView>
	</SafeAreaView>
);