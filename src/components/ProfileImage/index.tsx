import { t } from 'i18next'
import React, { FC, FormEvent, useRef } from 'react'
import { Button } from '../ui/Button'
import { ProfileImageProps } from './types'
import styles from './profileImage.module.sass'
import PersonIcon from '../../assets/svg/person.svg'
import ArrowUpIcon from '../../assets/svg/arrow-up-circle.svg'
import LightIcon from '../../assets/svg/lightbulb-outline.svg'
import { Switch } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setRoundedAvatar } from '../../redux/slices/authenticateUser'
import { RootState } from '~/redux/store'

const ProfileImage: FC<ProfileImageProps> = ({ avatarURL, handleFile }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const handleButtonClick = (e: FormEvent) => {
    e.preventDefault()
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const roundedAvatar = useSelector(
    (state: RootState) => state.authenticateUser.roundedAvatar
  )

  const handleRoundedAvatar = () => {
    dispatch(setRoundedAvatar(roundedAvatar ? false : true))
  }

  const roundedImage = roundedAvatar
    ? { borderRadius: 60, height: 100, width: 100 }
    : { borderRadius: 12, height: 130, width: 100 }

  return (
    <div className={styles.profileImage}>
      {!avatarURL ? (
        <div className={styles.avatarBox} style={roundedImage}>
          <img
            src={PersonIcon}
            className={styles.personIcon}
            style={roundedImage}
          />
        </div>
      ) : (
        <div className={styles.avatarBox} style={roundedImage}>
          <img src={avatarURL} alt="productPhoto" style={roundedImage} />
        </div>
      )}
      <div className={styles.options}>
        <div className={styles.rowBox}>
          <text>{t('SCREENS.DASHBOARD.AVATAR.TEXT_ONE')}</text>
          <Button id="inputFile" type="button" className={styles.button}>
            <img
              src={LightIcon}
              className={styles.iconBox}
              alt="upload"
              style={{ backgroundColor: 'transparent' }}
            />
          </Button>
        </div>

        <div className={styles.rowBox}>
          <Button
            onClick={handleButtonClick}
            className={styles.button}
            id="uploadButton"
          >
            <img src={ArrowUpIcon} className={styles.iconBox} alt="upload" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            id="inputFile"
            accept="image/png, image/jpeg"
            onChange={handleFile}
            className={styles.hidden}
          />

          <text className={styles.addPhotoText}>
            {t('SCREENS.DASHBOARD.AVATAR.TEXT_TWO')}
          </text>
        </div>

        <div className={styles.rowBox}>
          <Switch
            checked={roundedAvatar}
            onChange={handleRoundedAvatar}
            color="secondary"
            size="small"
            defaultChecked
          />
          <text>{t('SCREENS.DASHBOARD.AVATAR.TEXT_THREE')}</text>
        </div>
      </div>
    </div>
  )
}
export default ProfileImage
