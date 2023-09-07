import { styled } from "styled-components";

import {ReactComponent as DefaultShoppingSvg} from '../../assets/shopping-bag-default.svg'
import {ReactComponent as HomeShoppingSvg} from '../../assets/shopping-bag-white.svg'

export const DefaultShoppingIcon = styled(DefaultShoppingSvg)`
  width: 24px;
  height: 24px;
`
export const HomeShoppingIcon = styled(HomeShoppingSvg)`
  width: 24px;
  height: 24px;
`

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const DefaultItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`
export const HomeItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
  color: white;
`



