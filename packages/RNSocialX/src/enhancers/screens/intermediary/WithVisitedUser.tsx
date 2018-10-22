import * as React from 'react';

import { SCREENS } from '../../../environment/consts';
import { IVisitedUser, SearchResultKind } from '../../../types';

import { WithConfig } from '../../connectors/app/WithConfig';
import { WithNavigationParams } from '../../connectors/app/WithNavigationParams';
import { WithProfiles } from '../../connectors/data/WithProfiles';

interface IWithVisitedUserProps {
	children({ visitedUser }: { visitedUser: IVisitedUser | any }): JSX.Element;
}

interface IWithVisitedUserState {}

export class WithVisitedUser extends React.Component<
	IWithVisitedUserProps,
	IWithVisitedUserState
> {
	render() {
		return (
			<WithNavigationParams>
				{(navigationProps) => (
					<WithConfig>
						{({ appConfig }) => (
							<WithProfiles>
								{({ profiles }) => {
									const { navigationParams } = navigationProps;
									const { userId } = navigationParams[SCREENS.UserProfile];

									const foundProfile = profiles.find(
										(profile) => profile.alias === userId,
									);

									let visitedUser;
									if (foundProfile) {
										visitedUser = {
											userId: foundProfile!.alias,
											fullName: foundProfile.fullName,
											userName: foundProfile!.alias,
											avatarURL:
												foundProfile.avatar.length > 0
											? appConfig.ipfsConfig.ipfs_URL +
										  foundProfile.avatar // tslint:disable-line
													: '',
											aboutMeText: foundProfile.aboutMeText,
											numberOfLikes: 0,
											numberOfPhotos: 0,
											numberOfFriends: foundProfile.friends.length,
											numberOfComments: 0,
											mediaObjects: [],
											recentPosts: [],
											relationship: SearchResultKind.NotFriend,
										};
									}

									return this.props.children({
										visitedUser,
									});
								}}
							</WithProfiles>
						)}
					</WithConfig>
				)}
			</WithNavigationParams>
		);
	}
}
