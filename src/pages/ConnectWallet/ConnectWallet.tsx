import { Button } from '@chakra-ui/button'
import { DarkMode } from '@chakra-ui/color-mode'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Badge, Center, Circle, Flex, Link } from '@chakra-ui/layout'
import { Keyring } from '@shapeshiftoss/hdwallet-core'
import * as native from '@shapeshiftoss/hdwallet-native'
import { NativeHDWallet } from '@shapeshiftoss/hdwallet-native'
import { Vault } from '@shapeshiftoss/hdwallet-native-vault'
import { Dispatch, useEffect } from 'react'
import { isFirefox } from 'react-device-detect'
import { useTranslate } from 'react-polyglot'
import { generatePath, matchPath } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Orbs from 'assets/orbs.svg'
import OrbsStatic from 'assets/orbs-static.png'
import { FoxIcon } from 'components/Icons/FoxIcon'
import { Page } from 'components/Layout/Page'
import { RawText, Text } from 'components/Text'
import { ActionTypes, WalletActions } from 'context/WalletProvider/actions'
import { SUPPORTED_WALLETS } from 'context/WalletProvider/config'
import { KeyManager } from 'context/WalletProvider/KeyManager'
import { useQuery } from 'hooks/useQuery/useQuery'
import { useWallet } from 'hooks/useWallet/useWallet'
import { colors } from 'theme/colors'

async function connectCypressWallet(
  keyring: Keyring,
  dispatch: Dispatch<ActionTypes>,
  walletSeed: string,
  walletPassword: string,
) {
  // Import wallet
  const vault = await Vault.create()
  vault.meta.set('createdAt', Date.now())
  vault.set('#mnemonic', walletSeed)
  vault.seal()
  await vault.setPassword(walletPassword)
  vault.meta.set('name', 'CypressWallet')
  await Promise.all([navigator.storage?.persist?.(), vault.save()])
  // Load wallet
  const deviceId = vault.id
  const adapter = SUPPORTED_WALLETS[KeyManager.Native].adapter.useKeyring(keyring)
  const wallet = (await adapter.pairDevice(deviceId)) as NativeHDWallet
  const mnemonic = (await vault.get('#mnemonic')) as native.crypto.Isolation.Core.BIP39.Mnemonic
  mnemonic.addRevoker?.(() => vault.revoke())
  await wallet.loadDevice({ mnemonic, deviceId })
  const { name, icon } = SUPPORTED_WALLETS[KeyManager.Native]
  dispatch({
    type: WalletActions.SET_WALLET,
    payload: {
      wallet,
      name,
      icon,
      deviceId,
      meta: { label: vault.meta.get('name') as string },
    },
  })
  dispatch({ type: WalletActions.SET_WALLET_MODAL, payload: false })
}

export const ConnectWallet = () => {
  const { state, dispatch, connectDemo } = useWallet()
  const isCypressTest =
    localStorage.hasOwnProperty('cypressWalletSeed') &&
    localStorage.hasOwnProperty('cypressWalletPassword')
  const hasWallet = Boolean(state.walletInfo?.deviceId)

  const history = useHistory()
  const translate = useTranslate()
  const query = useQuery<{ returnUrl: string }>()
  useEffect(() => {
    // This handles reloading an asset's account page on Native/KeepKey. Without this, routing will break.
    // /:accountId/:assetId really is /:accountId/:chainId/:assetSubId e.g /accounts/eip155:1:0xmyPubKey/eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
    // The (/:chainId/:assetSubId) part is URI encoded as one entity in the regular app flow in <AssetAccountRow />, using generatePath()
    // This applies a similar logic here, that works with history.push()
    const match = matchPath<{ accountId?: string; chainId?: string; assetSubId?: string }>(
      query.returnUrl,
      {
        path: '/accounts/:accountId/:chainId/:assetSubId',
      },
    )
    const path = match
      ? generatePath('/accounts/:accountId/:assetId', {
          accountId: match?.params?.accountId ?? '',
          assetId: `${match?.params?.chainId ?? ''}/${match?.params?.assetSubId ?? ''}`,
        })
      : query?.returnUrl
    hasWallet && history.push(path ?? '/dashboard')
    // Programmatic login for Cypress tests
    // The first `!state.isConnected` filters any re-render if the wallet is already connected.
    if (isCypressTest && !state.isConnected) {
      const walletSeed = localStorage.getItem('cypressWalletSeed') || ''
      const walletPassword = localStorage.getItem('cypressWalletPassword') || ''
      connectCypressWallet(state.keyring, dispatch, walletSeed, walletPassword)
        .then(() => {
          // The second `!state.isConnected` filters any intent to redirect if the redirecting had already happened.
          if (!state.isConnected) {
            dispatch({ type: WalletActions.SET_IS_CONNECTED, payload: true })
            history.push(query?.returnUrl ? query.returnUrl : '/dashboard')
          }
        })
        .catch(e => console.error(e))
    }
  }, [history, hasWallet, query, state, dispatch, isCypressTest])
  return (
    <Page>
      <Flex
        direction={'column'}
        gap={4}
        width='full'
        bg='gray.900'
        position='fixed'
        zIndex={3}
        py={3}
        px={4}
        bottom={0}
        alignItems={'center'}
      >
        <DarkMode>
          <Flex width='full' alignItems='center' justifyContent='center'>
            <Text color='white' fontWeight='bold' translation='connectWalletPage.shapeshift' />
            <Badge colorScheme='blue' ml={2}>
              {translate('connectWalletPage.alpha')}
            </Badge>
          </Flex>
          <Flex width='full' alignItems='center' justifyContent='center' gap={8}>
            <Link href='/#/legal/terms-of-service'>
              <Text color='gray.500' translation='common.terms' />
            </Link>
            <Link href='/#/legal/privacy-policy'>
              <Text color='gray.500' translation='common.privacy' />
            </Link>
          </Flex>
        </DarkMode>
      </Flex>
      <Center
        flexDir='column'
        height='100vh'
        backgroundImage={colors.altBg}
        px={6}
        _after={{
          position: 'absolute',
          content: '""',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${isFirefox ? OrbsStatic : Orbs})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <Circle size='100px' mb={6}>
          <FoxIcon boxSize='100%' color='white' />
        </Circle>
        <Flex flexDir='row' textAlign='center' fontSize={{ base: '6xl', lg: '8xl' }} mb={6}>
          <RawText color='white' fontWeight='medium' lineHeight='1'>
            {translate('connectWalletPage.exploreThe')}{' '}
            <RawText color='blue.500' fontWeight='bold' as='span'>
              {translate('connectWalletPage.defiUniverse')}
            </RawText>
          </RawText>
        </Flex>
        <Text
          color='gray.500'
          fontSize='lg'
          mb={12}
          textAlign='center'
          translation='connectWalletPage.body'
        />
        <Button
          size='lg'
          zIndex={1}
          colorScheme='blue'
          onClick={() => dispatch({ type: WalletActions.SET_WALLET_MODAL, payload: true })}
          data-test='connect-wallet-button'
        >
          <Text translation='connectWalletPage.cta' />
        </Button>
        <Button
          size='md'
          zIndex={1}
          colorScheme='blue'
          variant='ghost'
          mt={6}
          rightIcon={<ArrowForwardIcon />}
          onClick={connectDemo}
          isLoading={state.isLoadingLocalWallet}
        >
          <Text translation='connectWalletPage.orViewADemo' />
        </Button>
      </Center>
    </Page>
  )
}
