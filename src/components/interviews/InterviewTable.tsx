import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Ellipsis, Pencil, Trash } from 'lucide-react';
import { useInterviewStore } from '@/store/interviews';
import { cn, formatTimeSlot } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Interview } from '@/types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function InterviewTable() {
    const [interviewToDelete, setInterviewToDelete] = useState<string | null>(
        null,
    );
    const { interviews, deleteInterview } = useInterviewStore();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleDelete = () => {
        if (interviewToDelete) {
            deleteInterview(interviewToDelete);
            toast({
                title: 'Interview Deleted',
                description: 'The interview has been successfully deleted.',
            });
            setInterviewToDelete(null);
        }
    };

    return (
        <>
            <div className='rounded-md border-2'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[150px]'>
                                Candidate Name
                            </TableHead>
                            <TableHead>Interviewer</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className='text-right'>
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {interviews.map((interview: Interview) => {
                            return (
                                <TableRow>
                                    <TableCell className='font-medium'>
                                        {interview.candidateName}
                                    </TableCell>
                                    <TableCell>
                                        {interview.interviewerName}
                                    </TableCell>
                                    <TableCell>{interview.type}</TableCell>
                                    <TableCell>
                                        {format(interview.date, 'PPPP')}
                                    </TableCell>
                                    <TableCell>{formatTimeSlot(interview.timeSlot)}</TableCell>
                                    <TableCell
                                        className={cn(
                                            'capitalize',
                                            {
                                                scheduled: 'text-blue-500',
                                                cancelled: 'text-red-500',
                                                completed: 'text-emerald-500',
                                            }[interview.status],
                                        )}
                                    >
                                        {interview.status}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant='ghost'
                                                    className='p-0 size-8'
                                                >
                                                    <Ellipsis className='size-4' />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        navigate(
                                                            `/edit/${interview.id}`,
                                                        )
                                                    }
                                                >
                                                    <Pencil className='mr-2 size-4' />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className='text-destructive'
                                                    onClick={() =>
                                                        setInterviewToDelete(
                                                            interview.id,
                                                        )
                                                    }
                                                >
                                                    <Trash className='mr-2 size-4' />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog
                open={!!interviewToDelete}
                onOpenChange={() => setInterviewToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the interview.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className='bg-destructive hover:bg-red-700 text-destructive-foreground'
                            onClick={handleDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
