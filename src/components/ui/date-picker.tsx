'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { DateRange } from 'react-day-picker';

interface DatePickerProps {
    date?: Date;
    range?: DateRange;
    onSelect?: (date: Date | undefined) => void;
    onRangeSelect?: (range: DateRange | undefined) => void;
    className?: string;
    mode?: 'single' | 'range';
}

export function DatePicker({ date, range, onSelect, onRangeSelect, className, mode = 'single' }: DatePickerProps) {
    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn(
                            'w-full justify-start text-left font-normal',
                            (mode === 'single' && !date) || (mode === 'range' && !range) ? 'text-muted-foreground' : '',
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {mode === 'single' ? (
                            date ? (
                                format(date, 'dd/MM/yyyy')
                            ) : (
                                <span>Escolha uma data</span>
                            )
                        ) : range && range.from && range.to ? (
                            `${format(range.from, 'dd/MM/yyyy')} - ${format(range.to, 'dd/MM/yyyy')}`
                        ) : (
                            <span>Escolha o intervalo</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode={mode}
                        selected={mode === 'single' ? date : range}
                        onSelect={mode === 'single' ? onSelect : onRangeSelect}
                        numberOfMonths={mode === 'range' ? 2 : 1}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
