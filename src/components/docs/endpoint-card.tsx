'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from './code-block';

interface EndpointCardProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  title: string;
  description: string;
  requestBody: string;
  responseBody: string;
}

export function EndpointCard({
  method,
  path,
  title,
  description,
  requestBody,
  responseBody,
}: EndpointCardProps) {
  const getMethodClass = () => {
    switch (method) {
      case 'GET': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'POST': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'PUT': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'DELETE': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-secondary';
    }
  };

  return (
    <Card className="not-prose my-8" id={path.replace(/\//g, '-')}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className={`font-mono text-sm font-semibold ${getMethodClass()}`}
          >
            {method}
          </Badge>
          <code className="text-sm font-mono text-muted-foreground">
            {path}
          </code>
        </div>
        <CardTitle className="!mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="request">
          <TabsList>
            <TabsTrigger value="request">Example Request</TabsTrigger>
            <TabsTrigger value="response">Example Response</TabsTrigger>
          </TabsList>
          <TabsContent value="request">
            <CodeBlock code={requestBody} lang="json" />
          </TabsContent>
          <TabsContent value="response">
            <CodeBlock code={responseBody} lang="json" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
