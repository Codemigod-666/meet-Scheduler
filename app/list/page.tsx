// "use client";

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// const ITEMS_PER_PAGE = 5;

// const MeetingList = () => {
//   const instantMeetings = useSelector(
//     (state: RootState) => state.meeting.instantMeetings
//   );
//   // const scheduledMeetings = useSelector(
//   //   (state: RootState) => state.meeting.scheduledMeetings
//   // );

//   const allMeetings = [...instantMeetings].sort(
//     (a, b) => Number(b.createdAt) - Number(a.createdAt)
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(allMeetings.length / ITEMS_PER_PAGE);

//   const paginatedMeetings = allMeetings.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handlePrev = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNext = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   return (
//     <Card className="min-h-[650px] w-full max-w-6xl mx-auto mt-6 shadow-lg rounded-2xl">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">
//           All Meetings
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {allMeetings.length === 0 ? (
//           <p className="text-center text-muted-foreground">
//             No meetings found.
//           </p>
//         ) : (
//           <>
//             <ScrollArea className="max-h-[500px] rounded-md border mb-4">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead className="w-[50px]">#</TableHead>
//                     <TableHead>Tag</TableHead>
//                     <TableHead>Link</TableHead>
//                     <TableHead>Created At</TableHead>
//                     <TableHead>Scheduled For</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {paginatedMeetings.map((meeting, index) => (
//                     <TableRow key={index}>
//                       <TableCell className="font-medium">
//                         {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
//                       </TableCell>
//                       <TableCell className="capitalize">
//                         <Badge
//                           className={
//                             meeting.tag === "instant"
//                               ? "bg-blue-500 hover:bg-blue-600"
//                               : "bg-green-500 hover:bg-green-600"
//                           }
//                         >
//                           {meeting.tag}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <a
//                           href={meeting.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 hover:underline break-all"
//                         >
//                           {meeting.link}
//                         </a>
//                       </TableCell>
//                       <TableCell>
//                         {new Date(meeting.createdAt).toLocaleString()}
//                       </TableCell>
//                       <TableCell>
//                         {meeting.scheduledFor
//                           ? new Date(meeting.scheduledFor).toLocaleString()
//                           : "—"}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </ScrollArea>

//             <div className="flex justify-center gap-4 mt-2">
//               <Button
//                 variant="outline"
//                 onClick={handlePrev}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </Button>
//               <span className="text-muted-foreground">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <Button
//                 variant="outline"
//                 onClick={handleNext}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </Button>
//             </div>
//           </>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default MeetingList;

"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 5;

const MeetingList = () => {
  const instantMeetings = useSelector(
    (state: RootState) => state.meeting.instantMeetings
  );

  const allMeetings = [...instantMeetings].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allMeetings.length / ITEMS_PER_PAGE);

  const paginatedMeetings = allMeetings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Card className="min-h-[650px] w-full max-w-6xl mx-auto mt-6 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          All Meetings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {allMeetings.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No meetings found.
          </p>
        ) : (
          <>
            <ScrollArea className="max-h-[500px] rounded-md border mb-4">
              <div className="min-h-[400px]">
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Tag</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Scheduled For</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMeetings.map((meeting, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            style={{ borderRadius: "8px" }}
                            className={`bg-${
                              meeting.tag === "instant" ? "blue" : "green"
                            }-500 hover:bg-${
                              meeting.tag === "instant" ? "blue" : "green"
                            }-600 text-white px-2 py-1`}
                          >
                            {meeting.tag}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <a
                            href={meeting.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {meeting.link}
                          </a>
                        </TableCell>
                        <TableCell>
                          {new Date(meeting.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {meeting.scheduledFor
                            ? new Date(meeting.scheduledFor).toLocaleString()
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>

            {/* Pagination controls */}
            <Pagination className="flex justify-center mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    style={{ cursor: "pointer" }}
                    onClick={handlePrev}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="text-sm text-muted-foreground mt-1">
                    Page {currentPage} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handleNext}
                    style={{ cursor: "pointer" }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MeetingList;
