import { useState } from 'react';
import type { AccountBalances } from '../../../services/accountService';
import {
  convert,
  getRate,
  hasEnoughBalance,
} from '../../../utils/exchange';
import type { Currency } from '../../../utils/exchange';
import { useExchangeRates } from './useExchangeRates';
import { useExchangeSubmit } from './useExchangeSubmit';

interface UseExchangeFormParams {
  balances: AccountBalances;
  onSuccess: () => void;
}

export function useExchangeForm({
  balances,
  onSuccess,
}: UseExchangeFormParams) {
  const [from, setFrom] = useState<Currency>('USD');
  const [to, setTo] = useState<Currency>('PEN');
  const [amount, setAmount] = useState('');

  const { rates, lastUpdated, ratesError } = useExchangeRates();

  const numericAmount = Number(amount);
  const balance = balances[from];
  const rate = rates ? getRate(from, to, rates) : 0;
  const result = rates
    ? convert(numericAmount, from, to, rates)
    : 0;

  const isSameCurrency = from === to;
  const isOverBalance = numericAmount > balance;
  const isBelowMinimum =
    amount !== '' && numericAmount < 0.1;

  const hasValidAmount =
    hasEnoughBalance(numericAmount, balance) &&
    !isBelowMinimum;

  const submit = useExchangeSubmit({
    amount: numericAmount,
    from,
    to,
    operationType: 'CAMBIO',
    canSubmit:
      rates !== null &&
      !isSameCurrency &&
      hasValidAmount,
    resetAmount: () => setAmount(''),
    onSuccess,
  });

  function handleSwap() {
    setFrom(to);
    setTo(from);
    submit.clearMessages();
  }

  return {
    from,
    to,
    amount,
    rates,
    ratesError,
    lastUpdated,
    numericAmount,
    balance,
    rate,
    result,
    isSameCurrency,
    isOverBalance,
    isBelowMinimum,
    canOperate:
      rates !== null &&
      !isSameCurrency &&
      hasValidAmount &&
      !submit.sending,
    setFrom,
    setTo,
    setAmount,
    handleSwap,
    ...submit,
  };
}